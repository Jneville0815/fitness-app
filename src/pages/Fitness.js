import React, { useState, useContext } from 'react'
import clsx from 'clsx'

import { DataGrid } from '@material-ui/data-grid'
import Switch from '@material-ui/core/Switch'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import useStyles from './styles'
import { Context } from '../context/Store'
import { push, pull, legs } from './fakeData'

const Fitness = () => {
    const classes = useStyles()
    const [checked, setChecked] = useState({
        pushChecked: false,
        pullChecked: false,
        legsChecked: false,
    })
    const [state, dispatch] = useContext(Context)

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
            <WorkoutSection
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
            />
        </div>
    )
}

export default Fitness
