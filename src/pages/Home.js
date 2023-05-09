import React, { useState, useContext, useEffect } from 'react'

import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import { Link, useHistory } from 'react-router-dom'

import useStyles from './styles'
import { Context } from '../context/Store'

const Home = ({ children }) => {
    const classes = useStyles()
    const history = useHistory()

    const [value, setValue] = useState(0)
    const [state, dispatch] = useContext(Context)

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    useEffect(() => {
        let path = window.location.pathname
        if (path === '/nutrition' && value !== 0) setValue(0)
        else if (path === '/fitness' && value !== 1) setValue(1)
        else if (path === '/quotes' && value !== 2) setValue(2)
        else if (path === '/settings' && value !== 3) setValue(3)
    }, [value])

    return (
        <div>
            <Paper className={classes.tabs}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    <Tab component={Link} label="Nutrition" to="/nutrition" />
                    <Tab component={Link} label="Fitness" to="/fitness" />
                    <Tab component={Link} label="Quotes" to="/quotes" />
                    <Tab component={Link} label="Settings" to="/settings" />
                </Tabs>
            </Paper>

            {children}
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
    )
}

export default Home
