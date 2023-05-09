import React, { useState, useEffect } from 'react'
import clsx from 'clsx'

import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core//MenuItem'
import Select from '@material-ui/core//Select'

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
    const [profile, setProfile] = useState({
        age: '',
        sex: '',
        heightFeet: '',
        heightInches: '',
        weight: '',
        goal: '',
        activityLevel: '',
    })
    const [calculatedMacros, setCalculatedMacros] = useState({
        calories: '',
        protein: '',
        carbs: '',
        fat: '',
    })
    const [calculationSubmitted, setCalculationSubmitted] = useState(false)
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

    const calculateMacros = () => {
        let calories = 0
        let daily_cal = 0
        let fat = 0
        let carbs = 0
        let protein = 0

        let height =
            parseInt(profile.heightFeet) * 30.48 +
            parseInt(profile.heightInches) * 2.54

        let orgWeight = parseInt(profile.weight)

        let weight = orgWeight * 0.453592

        let age = parseInt(profile.age)

        if (profile.sex === 0) {
            // male
            calories = weight * 10 + height * 6.25 - age * 5 + 5
            daily_cal = Math.round(calories)
        } else {
            // female
            calories = weight * 10 + height * 6.25 - age * 5 - 161
            daily_cal = Math.round(calories)
        }

        switch (profile.activityLevel) {
            case 0:
                calories = Math.round(calories * 1.2)
                break
            case 1:
                calories = Math.round(calories * 1.375)
                break
            case 2:
                calories = Math.round(calories * 1.466)
                break
            case 3:
                calories = Math.round(calories * 1.55)
                break
            case 4:
                calories = Math.round(calories * 1.725)
                break
            case 5:
                calories = Math.round(calories * 1.9)
                break
        }

        switch (profile.goal) {
            case 0:
                if (calories <= 2000) calories = Math.round(0.9 * calories)
                if (calories > 2000) calories = Math.round(0.8 * calories)
                fat = Math.round(orgWeight * 0.3)
                break
            case 1:
                fat = Math.round(orgWeight * 0.4)
                break
            case 2:
                calories += 200
                fat = Math.round(orgWeight * 0.5)
                break
        }

        protein = orgWeight
        let pCalories = protein * 4
        let fCalories = fat * 9
        let pfCalories = pCalories + fCalories

        carbs = Math.round((calories - pfCalories) / 4)

        setCalculatedMacros({
            ...calculatedMacros,
            calories,
            fat,
            protein,
            carbs,
        })
        setCalculationSubmitted(true)
    }

    const handleChange = (prop) => (event) => {
        setNutrients({ ...nutrients, [prop]: event.target.value })
    }

    const handleFitnessChange = (prop) => (event) => {
        setMaxLifts({ ...maxLifts, [prop]: event.target.value })
    }

    const handleProfileChange = (prop) => (event) => {
        setProfile({ ...profile, [prop]: event.target.value })
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
                <h2>Profile</h2>
                <FormControl
                    className={clsx(classes.margin, classes.textField)}
                >
                    <InputLabel>Age</InputLabel>
                    <Input
                        type={'text'}
                        value={profile.age}
                        onChange={handleProfileChange('age')}
                    />
                </FormControl>
                <FormControl
                    className={clsx(classes.margin, classes.textField)}
                >
                    <InputLabel>Sex</InputLabel>
                    <Select
                        value={profile.sex}
                        onChange={handleProfileChange('sex')}
                    >
                        <MenuItem value={0}>Male</MenuItem>
                        <MenuItem value={1}>Female</MenuItem>
                    </Select>
                </FormControl>
                <div>
                    <FormControl
                        className={clsx(classes.margin, classes.sexField)}
                    >
                        <InputLabel>Height (ft)</InputLabel>
                        <Select
                            value={profile.heightFeet}
                            onChange={handleProfileChange('heightFeet')}
                        >
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={6}>6</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl
                        className={clsx(classes.margin, classes.sexField)}
                    >
                        <InputLabel>Height (in)</InputLabel>
                        <Select
                            value={profile.heightInches}
                            onChange={handleProfileChange('heightInches')}
                        >
                            <MenuItem value={0}>0</MenuItem>
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={6}>6</MenuItem>
                            <MenuItem value={7}>7</MenuItem>
                            <MenuItem value={8}>8</MenuItem>
                            <MenuItem value={9}>9</MenuItem>
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={11}>11</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <FormControl
                    className={clsx(classes.margin, classes.textField)}
                >
                    <InputLabel>Weight (lbs)</InputLabel>
                    <Input
                        type={'text'}
                        value={profile.weight}
                        onChange={handleProfileChange('weight')}
                    />
                </FormControl>
                <FormControl
                    className={clsx(classes.margin, classes.textField)}
                >
                    <InputLabel>Goal</InputLabel>
                    <Select
                        value={profile.goal}
                        onChange={handleProfileChange('goal')}
                    >
                        <MenuItem value={0}>Fat Loss</MenuItem>
                        <MenuItem value={1}>Maintenance</MenuItem>
                        <MenuItem value={2}>Gain Muscle</MenuItem>
                    </Select>
                </FormControl>
                <FormControl
                    className={clsx(classes.margin, classes.textField)}
                >
                    <InputLabel>Activity Level</InputLabel>
                    <Select
                        value={profile.activityLevel}
                        onChange={handleProfileChange('activityLevel')}
                    >
                        <MenuItem value={0}>None</MenuItem>
                        <MenuItem value={1}>1-3 times per week</MenuItem>
                        <MenuItem value={2}>4-5 times per week</MenuItem>
                        <MenuItem value={3}>Daily Moderate</MenuItem>
                        <MenuItem value={4}>Daily Intense</MenuItem>
                        <MenuItem value={5}>24/7 365 Bout That Life</MenuItem>
                    </Select>
                </FormControl>
                {calculationSubmitted && (
                    <div>
                        <p className={clsx(classes.noSpaceP)}>
                            Calories: {calculatedMacros.calories}
                        </p>
                        <p className={clsx(classes.noSpaceP)}>
                            Protein: {calculatedMacros.protein}
                        </p>
                        <p className={clsx(classes.noSpaceP)}>
                            Carbs: {calculatedMacros.carbs}
                        </p>
                        <p className={clsx(classes.noSpaceP)}>
                            Fat: {calculatedMacros.fat}
                        </p>
                    </div>
                )}

                <Button
                    className={clsx(classes.marginTop)}
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        calculateMacros()
                    }}
                >
                    Calculate
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
