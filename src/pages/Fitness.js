import React, { useState, useContext, useEffect } from 'react'
import clsx from 'clsx'

import { DataGrid } from '@material-ui/data-grid'
import Switch from '@material-ui/core/Switch'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'

import useStyles from './styles'
import { Context } from '../context/Store'
import backend from '../api/backend'
import { push, pull, legs } from './fakeData'

const Fitness = () => {
    const classes = useStyles()
    const [checked, setChecked] = useState({
        pushChecked: false,
        pullChecked: false,
        legsChecked: false,
    })
    const [state, dispatch] = useContext(Context)
    const [value, setValue] = React.useState('bench')
    const [maxLifts, setMaxLifts] = useState({
        benchMax: 0,
        deadliftMax: 0,
        squatMax: 0,
        pressMax: 0,
    })

    const retrieveMaxLifts = async () => {
        try {
            const response = await backend.get(
                `/userInfo/${state.user_id}/fitness`,
                {
                    headers: {
                        Authorization: `Bearer ${state.apiToken}`,
                    },
                }
            )
            setMaxLifts(response.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        retrieveMaxLifts()
    }, [])

    const handleWendlerChange = (event) => {
        setValue(event.target.value)
    }

    const columns = [
        {
            field: 'name',
            headerName: 'Name',
            width: 200,
            editable: true,
        },
        {
            field: 'startingWeight',
            headerName: 'Starting Weight',
            width: 175,
            editable: true,
        },
        {
            field: 'finishingWeight',
            headerName: 'Finishing Weight',
            width: 190,
            editable: true,
        },
        {
            field: 'sets',
            headerName: 'Sets',
            width: 110,
            editable: true,
        },
        {
            field: 'targetReps',
            headerName: 'Target Reps',
            width: 175,
            editable: true,
        },
    ]

    const wendlerColumns = [
        {
            field: 'week',
            headerName: 'Week',
            width: 120,
            editable: false,
        },
        {
            field: 'set1',
            headerName: 'Set 1',
            width: 110,
            editable: false,
        },
        {
            field: 'set2',
            headerName: 'Set 2',
            width: 110,
            editable: false,
        },
        {
            field: 'set3',
            headerName: 'Set 3',
            width: 110,
            editable: false,
        },
        {
            field: 'set4',
            headerName: 'Set 4',
            width: 110,
            editable: false,
        },
        {
            field: 'set5',
            headerName: 'Set 5',
            width: 110,
            editable: false,
        },
        {
            field: 'set6',
            headerName: 'Set 6',
            width: 110,
            editable: false,
        },
    ]

    function round5(x) {
        return Math.ceil(x / 5) * 5
    }

    let tempValue
    if (value === 'bench') {
        tempValue = maxLifts.benchMax
    } else if (value === 'squat') {
        tempValue = maxLifts.squatMax
    } else if (value === 'deadlift') {
        tempValue = maxLifts.deadliftMax
    } else if (value === 'press') {
        tempValue = maxLifts.pressMax
    } else {
        console.log('This should never happen')
    }
    tempValue *= 0.9

    const wendlerRows = [
        {
            id: 0,
            week: 1,
            set1: `${round5(tempValue * 0.4)}x5`,
            set2: `${round5(tempValue * 0.5)}x5`,
            set3: `${round5(tempValue * 0.6)}x3`,
            set4: `${round5(tempValue * 0.65)}x5`,
            set5: `${round5(tempValue * 0.75)}x5`,
            set6: `${round5(tempValue * 0.85)}xUF`,
        },
        {
            id: 1,
            week: 2,
            set1: `${round5(tempValue * 0.4)}x5`,
            set2: `${round5(tempValue * 0.5)}x5`,
            set3: `${round5(tempValue * 0.6)}x3`,
            set4: `${round5(tempValue * 0.7)}x3`,
            set5: `${round5(tempValue * 0.8)}x3`,
            set6: `${round5(tempValue * 0.9)}xUF`,
        },
        {
            id: 2,
            week: 3,
            set1: `${round5(tempValue * 0.4)}x5`,
            set2: `${round5(tempValue * 0.5)}x5`,
            set3: `${round5(tempValue * 0.6)}x3`,
            set4: `${round5(tempValue * 0.75)}x5`,
            set5: `${round5(tempValue * 0.85)}x3`,
            set6: `${round5(tempValue * 0.95)}xUF`,
        },
        {
            id: 3,
            week: 4,
            set1: `${round5(tempValue * 0.4)}x5`,
            set2: `${round5(tempValue * 0.5)}x5`,
            set3: `${round5(tempValue * 0.6)}x5`,
            set4: 'N/A',
            set5: 'N/A',
            set6: 'N/A',
        },
    ]

    const handleChange = (event) => {
        setChecked({ ...checked, [event.target.name]: event.target.checked })
    }

    const WorkoutSection = ({ name, data, checked, change }) => {
        return (
            <div
                style={{
                    width: '100%',
                    marginLeft: 20,
                }}
            >
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={checked}
                                color="primary"
                                name={`${name}Checked`}
                                onChange={change}
                                inputProps={{
                                    'aria-label': 'primary checkbox',
                                }}
                            />
                        }
                        label={
                            name.charAt(0).toUpperCase() +
                            name.slice(1).toLowerCase()
                        }
                    />
                </FormGroup>

                {checked && (
                    <DataGrid
                        rows={data}
                        columns={columns}
                        autoHeight={true}
                        autoPageSize={true}
                        hideFooter={true}
                        onCellEditCommit={(i, event) => console.log(i)}
                    />
                )}
            </div>
        )
    }
    return (
        <div className={clsx(classes.root)}>
            <h1>Fitness Page</h1>
            {/* <WorkoutSection
                name="push"
                data={push}
                checked={checked.pushChecked}
                change={handleChange}
            />
            <WorkoutSection
                name="pull"
                data={pull}
                checked={checked.pullChecked}
                change={handleChange}
            />
            <WorkoutSection
                name="legs"
                data={legs}
                checked={checked.legsChecked}
                change={handleChange}
            /> */}

            <FormControl component="fieldset">
                <RadioGroup
                    aria-label="lift"
                    name="lift1"
                    value={value}
                    onChange={handleWendlerChange}
                >
                    <FormControlLabel
                        value="bench"
                        control={<Radio />}
                        label={`Bench: ${maxLifts.benchMax}`}
                    />
                    <FormControlLabel
                        value="deadlift"
                        control={<Radio />}
                        label={`Deadlift: ${maxLifts.deadliftMax}`}
                    />
                    <FormControlLabel
                        value="squat"
                        control={<Radio />}
                        label={`Squat: ${maxLifts.squatMax}`}
                    />
                    <FormControlLabel
                        value="press"
                        control={<Radio />}
                        label={`Press: ${maxLifts.pressMax}`}
                    />
                </RadioGroup>
            </FormControl>
            <DataGrid
                style={{ width: '100%', marginLeft: 20, marginTop: 20 }}
                rows={wendlerRows}
                columns={wendlerColumns}
                autoHeight={true}
                autoPageSize={true}
                hideFooter={true}
            />
        </div>
    )
}

export default Fitness
