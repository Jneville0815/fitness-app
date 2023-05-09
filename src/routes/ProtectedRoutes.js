import { Route, Redirect } from 'react-router-dom'
import Home from '../pages/Home'

function ProtectedRoute({ children, ...rest }) {
    const token = localStorage.getItem('token')
    console.log('token', token)
    return (
        <Route
            {...rest}
            render={() => {
                return token ? <Home>{children}</Home> : <Redirect to="/" />
            }}
        />
    )
}

export default ProtectedRoute
