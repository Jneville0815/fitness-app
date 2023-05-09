import './App.css'
import Login from './pages/Login'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import ProtectedRoute from './routes/ProtectedRoutes'
import Nutrition from './pages/Nutrition'
import Fitness from './pages/Fitness'
import Quotes from './pages/Quotes'
import Settings from './pages/Settings'

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Login />
                </Route>
                <ProtectedRoute path="/nutrition">
                    <Nutrition />
                </ProtectedRoute>
                <ProtectedRoute path="/fitness">
                    <Fitness />
                </ProtectedRoute>
                <ProtectedRoute path="/quotes">
                    <Quotes />
                </ProtectedRoute>
                <ProtectedRoute path="/settings">
                    <Settings />
                </ProtectedRoute>
            </Switch>
        </Router>
    )
}

export default App
