import React, { useState, useContext, useEffect } from 'react'

import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory,
} from 'react-router-dom'

import useStyles from './styles'
import Nutrition from './Nutrition'
import Fitness from './Fitness'
import { Context } from '../context/Store'
import Settings from './Settings'

const Home = () => {
    const classes = useStyles()
    const history = useHistory()

    const [value, setValue] = useState(0)
    const [state, dispatch] = useContext(Context)

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    useEffect(() => {
        if (state.apiToken === '') {
            history.push('/')
        }
    }, [])

    return (
        <Router>
            <div>
                <Paper className={classes.tabs}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Tab
                            component={Link}
                            label="Nutrition"
                            to="/nutrition"
                        />
                        <Tab component={Link} label="Fitness" to="/fitness" />
                        <Tab component={Link} label="Settings" to="/settings" />
                    </Tabs>
                </Paper>

                <Switch>
                    <Route exact path="/home">
                        <Nutrition />
                    </Route>
                    <Route path="/nutrition">
                        <Nutrition />
                    </Route>
                    <Route path="/fitness">
                        <Fitness />
                    </Route>
                    <Route path="/settings">
                        <Settings />
                    </Route>
                </Switch>
                <div className={classes.linkContainer}>
                    <Link
                        to={'/'}
                        onClick={() => {
                            dispatch({ type: 'SIGN_OUT', payload: '' })
                            history.push('/')
                        }}
                    >
                        Log Out
                    </Link>
                </div>
            </div>
        </Router>
    )
}

export default Home
