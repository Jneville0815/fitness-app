import React from 'react'
import clsx from 'clsx'

import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    margin: {
        margin: theme.spacing(1),
    },
    marginTop: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '25ch',
    },
}))

const Login = () => {
    const classes = useStyles()
    const [values, setValues] = React.useState({
        username: '',
        password: '',
        showPassword: false,
    })
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value })
    }

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword })
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    }

    return (
        <div className={clsx(classes.root)}>
            <h1>Login Page</h1>
            <FormControl className={clsx(classes.margin, classes.textField)}>
                <InputLabel htmlFor="standard-adornment-username">
                    Username
                </InputLabel>
                <Input
                    id="standard-adornment-username"
                    type={'text'}
                    value={values.username}
                    onChange={handleChange('username')}
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
            <Button
                className={clsx(classes.marginTop)}
                variant="contained"
                color="primary"
                href="/home"
            >
                Login
            </Button>
        </div>
    )
}

export default Login
