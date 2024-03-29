import React, { useState, useEffect } from 'react'
import clsx from 'clsx'

import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import useStyles from './styles'
import { useHistory } from 'react-router-dom'

import backend from '../api/backend'

const Login = () => {
    const classes = useStyles()
    const history = useHistory()

    const [values, setValues] = useState({
        email: '',
        password: '',
        showPassword: false,
    })
    const [error, setError] = useState(false)

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value })
    }

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword })
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    }

    const authenticateUser = async () => {
        let email = values.email
        let password = values.password
        try {
            const response = await backend.post('/user/login', {
                email,
                password,
            })
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('user_id', response.data.user_id)
                setValues({ ...values, email: '', password: '' })
                console.log('Login Success')
                setError(false)
                history.push('/nutrition')
            }
        } catch (err) {
            setError(true)
            console.log('Login failed', err)
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        const user_id = localStorage.getItem('user_id')

        if (token && user_id) {
            history.push('/nutrition')
        }
    }, [])

    return (
        <div className={clsx(classes.root)}>
            <h1>Login Page</h1>
            <FormControl className={clsx(classes.margin, classes.textField)}>
                <InputLabel htmlFor="standard-adornment-username">
                    Email
                </InputLabel>
                <Input
                    id="standard-adornment-username"
                    type={'text'}
                    value={values.email}
                    onChange={handleChange('email')}
                />
            </FormControl>
            <FormControl className={clsx(classes.margin, classes.textField)}>
                <InputLabel htmlFor="standard-adornment-password">
                    Password
                </InputLabel>
                <Input
                    id="standard-adornment-password"
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChange('password')}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                            >
                                {values.showPassword ? (
                                    <Visibility />
                                ) : (
                                    <VisibilityOff />
                                )}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
            {error && (
                <p style={{ color: 'red', marginBottom: 0 }}>
                    Invalid Username Or Password
                </p>
            )}
            <Button
                className={clsx(classes.marginTop)}
                variant="contained"
                color="primary"
                onClick={() => {
                    authenticateUser()
                }}
            >
                Login
            </Button>
        </div>
    )
}

export default Login
