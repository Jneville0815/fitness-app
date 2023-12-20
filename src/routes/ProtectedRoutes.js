import { Route, Redirect } from 'react-router-dom'
import Layout from '../pages/Layout'

function ProtectedRoute({ children, ...rest }) {
    const token = localStorage.getItem('token')
    return (
        <Route
            {...rest}
            render={() => {
                return token ? <Layout>{children}</Layout> : <Redirect to="/" />
            }}
        />
    )
}

export default ProtectedRoute
