import './App.css'
import Login from './pages/Login'
import Store from './context/Store'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import ProtectedRoute from './routes/ProtectedRoutes'
import Nutrition from './pages/Nutrition'
import Fitness from './pages/Fitness'
import Quotes from './pages/Quotes'
import Settings from './pages/Settings'

function App() {
    return (
        <Store>
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
        </Store>
    )
}

export default App
