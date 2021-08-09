import React, { useState } from 'react'
import clsx from 'clsx'

import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
} from 'react-router-dom'

import useStyles from './styles'
import Nutrition from './Nutrition'
import Fitness from './Fitness'

const Home = () => {
    const classes = useStyles()
    const [value, setValue] = useState(0)

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

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
                </Switch>
            </div>
        </Router>
    )
}

export default Home
