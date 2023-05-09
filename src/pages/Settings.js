import React, { useState, useEffect } from 'react'
import clsx from 'clsx'

import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'

import useStyles from './styles'
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
    const [maxLifts, setMaxLifts] = useState({
        benchMax: 0,
        deadliftMax: 0,
        squatMax: 0,
        pressMax: 0,
    })
    const [submitted, setSubmitted] = useState(false)
    const [fitnessSubmitted, setFitnessSubmitted] = useState(false)
    const [submittedLabel, setSubmittedLabel] = useState('')
    const [fitnessSubmittedLabel, setFitnessSubmittedLabel] = useState('')

    const retrieveMaxLifts = async () => {
        try {
            const response = await backend.get(
                `/userInfo/${localStorage.getItem('user_id')}/fitness`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            'token'
                        )}`,
                    },
                }
            )
            setMaxLifts(response.data)
        } catch (err) {
            console.log(err)
        }
    }

    const submitNewFitness = async () => {
        try {
            const response = await backend.post(
                `/userInfo/${localStorage.getItem('user_id')}/fitness`,
                maxLifts,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            'token'
                        )}`,
                    },
                }
            )
            if (response.status === 200) {
                setFitnessSubmittedLabel('Updated!')
                setFitnessSubmitted(true)
                setTimeout(() => {
                    setFitnessSubmitted(false)
                }, 2000)
            }
        } catch (err) {
            setFitnessSubmittedLabel('Failed to Update')
            setFitnessSubmitted(true)
            setTimeout(() => {
                setFitnessSubmitted(false)
            }, 2000)
            console.log(err)
        }
    }

    const submitNewFood = async () => {
        try {
            const response = await backend.post(
                `/userInfo/${localStorage.getItem('user_id')}/addFood`,
                nutrients,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            'token'
                        )}`,
                    },
                }
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

    const handleFitnessChange = (prop) => (event) => {
        setMaxLifts({ ...maxLifts, [prop]: event.target.value })
    }

    useEffect(() => {
        retrieveMaxLifts()
    }, [])

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
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    marginTop: 50,
                }}
            >
                <h2>Update Max Lifts</h2>
                <FormControl
                    className={clsx(classes.margin, classes.textField)}
                >
                    <InputLabel>Bench</InputLabel>
                    <Input
                        type={'text'}
                        value={maxLifts.benchMax}
                        onChange={handleFitnessChange('benchMax')}
                    />
                </FormControl>
                <FormControl
                    className={clsx(classes.margin, classes.textField)}
                >
                    <InputLabel>Deadlift</InputLabel>
                    <Input
                        type={'text'}
                        value={maxLifts.deadliftMax}
                        onChange={handleFitnessChange('deadliftMax')}
                    />
                </FormControl>
                <FormControl
                    className={clsx(classes.margin, classes.textField)}
                >
                    <InputLabel>Squat</InputLabel>
                    <Input
                        type={'text'}
                        value={maxLifts.squatMax}
                        onChange={handleFitnessChange('squatMax')}
                    />
                </FormControl>
                <FormControl
                    className={clsx(classes.margin, classes.textField)}
                >
                    <InputLabel>Press</InputLabel>
                    <Input
                        type={'text'}
                        value={maxLifts.pressMax}
                        onChange={handleFitnessChange('pressMax')}
                    />
                </FormControl>
                {fitnessSubmitted && (
                    <p
                        style={{
                            color:
                                fitnessSubmittedLabel === 'Failed to Update'
                                    ? 'red'
                                    : 'green',
                            marginBottom: 0,
                        }}
                    >
                        {fitnessSubmittedLabel}
                    </p>
                )}
                <Button
                    className={clsx(classes.marginTop)}
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        submitNewFitness()
                    }}
                >
                    Update
                </Button>
            </div>
        </div>
    )
}

export default Settings
