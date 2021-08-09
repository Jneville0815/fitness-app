import './App.css'
import Login from './pages/Login'
import Store from './context/Store'

import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from './pages/Home'

function App() {
    return (
        <Store>
            <Router>
                <Route exact path="/">
                    <Login />
                </Route>
                <Route exact path="/home">
                    <Home />
                </Route>
            </Router>
        </Store>
    )
}

export default App
