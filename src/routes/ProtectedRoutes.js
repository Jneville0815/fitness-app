import { Route, Redirect } from 'react-router-dom'

function ProtectedRoute({ children, ...rest }) {
    const token = localStorage.getItem('token')
    console.log('token', token)
    return (
        <Route
            {...rest}
            render={() => {
                return token ? children : <Redirect to="/" />
            }}
        />
    )
}

export default ProtectedRoute
