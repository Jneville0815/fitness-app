import './App.css'
import Login from './pages/Login'

import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from './pages/Home'

function App() {
    return (
        <Router>
            <Route exact path="/">
                <Login />
            </Route>
            <Route exact path="/home">
                <Home />
            </Route>
        </Router>
    )
}

export default App
