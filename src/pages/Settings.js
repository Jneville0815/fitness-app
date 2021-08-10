import React, { useState, useEffect, useContext } from 'react'
import clsx from 'clsx'

import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'

import useStyles from './styles'
import { Context } from '../context/Store'
import backend from '../api/backend'

const Settings = () => {
    const classes = useStyles()

    const [nutrients, setNutrients] = useState({
        name: '',
        protein: '',
        carbs: '',
        fat: '',
        information: 'N/A',
    })
    const [submitted, setSubmitted] = useState(false)
    const [submittedLabel, setSubmittedLabel] = useState('')
    const [state, dispatch] = useContext(Context)

    const submitNewFood = async () => {
        try {
            const response = await backend.post(
                `/userInfo/${state.email}/addFood`,
                nutrients
            )
            if (response.status === 200) {
                setSubmittedLabel('Submitted!')
                setSubmitted(true)
                setNutrients({
                    name: '',
                    protein: '',
                    carbs: '',
                    fat: '',
                    information: 'N/A',
                })
                setTimeout(() => {
                    setSubmitted(false)
                }, 2000)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const handleChange = (prop) => (event) => {
        setNutrients({ ...nutrients, [prop]: event.target.value })
    }
    return (
        <div className={clsx(classes.root)}>
            <h1>Settings Page</h1>

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}
            >
                <h2>Add New Food</h2>
                <FormControl
                    className={clsx(classes.margin, classes.textField)}
                >
                    <InputLabel>Name</InputLabel>
                    <Input
                        type={'text'}
                        value={nutrients.name}
                        onChange={handleChange('name')}
                    />
                </FormControl>
                <FormControl
                    className={clsx(classes.margin, classes.textField)}
                >
                    <InputLabel>Protein</InputLabel>
                    <Input
                        type={'text'}
                        value={nutrients.protein}
                        onChange={handleChange('protein')}
                    />
                </FormControl>
                <FormControl
                    className={clsx(classes.margin, classes.textField)}
                >
                    <InputLabel>Carbs</InputLabel>
                    <Input
                        type={'text'}
                        value={nutrients.carbs}
                        onChange={handleChange('carbs')}
                    />
                </FormControl>
                <FormControl
                    className={clsx(classes.margin, classes.textField)}
                >
                    <InputLabel>Fat</InputLabel>
                    <Input
                        type={'text'}
                        value={nutrients.fat}
                        onChange={handleChange('fat')}
                    />
                </FormControl>
                <FormControl
                    className={clsx(classes.margin, classes.textField)}
                >
                    <InputLabel>Information</InputLabel>
                    <Input
                        type={'text'}
                        value={nutrients.information}
                        onChange={handleChange('information')}
                    />
                </FormControl>
                {submitted && (
                    <p
                        style={{
                            color:
                                submittedLabel === 'Invalid Entry'
                                    ? 'red'
                                    : 'green',
                            marginBottom: 0,
                        }}
                    >
                        {submittedLabel}
                    </p>
                )}
                <Button
                    className={clsx(classes.marginTop)}
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        if (nutrients.name.length > 0) {
                            submitNewFood()
                        } else {
                            setSubmittedLabel('Invalid Entry')
                            setSubmitted(true)
                            setTimeout(() => {
                                setSubmitted(false)
                            }, 2000)
                        }
                    }}
                >
                    Add
                </Button>
            </div>
        </div>
    )
}

export default Settings
