import React, { useState, useEffect } from 'react'
import clsx from 'clsx'

import { DataGrid } from '@material-ui/data-grid'

import useStyles from './styles'
import { push, pull, legs } from './fakeData'

const Fitness = () => {
    const classes = useStyles()

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
    return (
        <div className={clsx(classes.root)}>
            <h1>Fitness Page</h1>
            <div style={{ width: '100%' }}>
                <h2 style={{ marginLeft: 10 }}>Push</h2>
                <DataGrid
                    rows={push}
                    columns={columns}
                    autoHeight={true}
                    autoPageSize={true}
                    hideFooter={true}
                    onCellEditCommit={(i, event) => console.log(i)}
                />
            </div>
            <div style={{ width: '100%' }}>
                <h2 style={{ marginLeft: 10 }}>Pull</h2>
                <DataGrid
                    rows={pull}
                    columns={columns}
                    autoHeight={true}
                    autoPageSize={true}
                    hideFooter={true}
                    onCellEditCommit={(i, event) => console.log(i)}
                />
            </div>
            <div style={{ width: '100%' }}>
                <h2 style={{ marginLeft: 10 }}>Legs</h2>
                <DataGrid
                    rows={legs}
                    columns={columns}
                    autoHeight={true}
                    autoPageSize={true}
                    hideFooter={true}
                    onCellEditCommit={(i, event) => console.log(i)}
                />
            </div>
        </div>
    )
}

export default Fitness
