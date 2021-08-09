import React, { useState, useEffect, useContext } from 'react'
import clsx from 'clsx'

import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import useStyles from './styles'
import { Context } from '../context/Store'
import { food, user } from './fakeData'

const Nutrition = () => {
    const classes = useStyles()

    const [currentFoods, setCurrentFoods] = useState([])
    const [foodSelectionIndex, setFoodSelectionIndex] = useState('')
    const [userData, setUserData] = useState({})
    const [inputValue, setInputValue] = useState('')
    const [state, dispatch] = useContext(Context)
    console.log(state)
    const handleChange = (event) => {
        setFoodSelectionIndex(event.target.value)
    }

    const handleInputChange = (event) => {
        setInputValue(event.target.value)
    }

    useEffect(() => {
        setUserData(user)
    }, [])

    return (
        <div className={clsx(classes.root)}>
            <h1>Nutrition Page</h1>
            <p>
                {userData.name} still needs: (
                {userData.targetProtein * 4 +
                    userData.targetCarbs * 4 +
                    userData.targetFat * 9 -
                    (userData.currentProtein * 4 +
                        userData.currentCarbs * 4 +
                        userData.currentFat * 9)}{' '}
                calories)
            </p>

            <div className={clsx(classes.macros)}>
                <p>Fat: {userData.targetFat - userData.currentFat}</p>
                <p>Carbs: {userData.targetCarbs - userData.currentCarbs}</p>
                <p>
                    Protein: {userData.targetProtein - userData.currentProtein}
                </p>
            </div>
            <div className={classes.addContainer}>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Food</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={foodSelectionIndex}
                        onChange={handleChange}
                    >
                        {food.map((food, index) => {
                            return (
                                <MenuItem key={index} value={index}>
                                    {food.name}
                                </MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
                <Button
                    className={clsx(classes.marginTop)}
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        if (foodSelectionIndex !== '') {
                            setCurrentFoods([
                                ...currentFoods,
                                food[foodSelectionIndex],
                            ])
                            setUserData({
                                ...userData,
                                currentProtein:
                                    userData.currentProtein +
                                    food[foodSelectionIndex].protein,
                                currentCarbs:
                                    userData.currentCarbs +
                                    food[foodSelectionIndex].carbs,
                                currentFat:
                                    userData.currentFat +
                                    food[foodSelectionIndex].fat,
                            })
                        }
                    }}
                >
                    Add
                </Button>
            </div>
            {currentFoods.length > 0 && (
                <TableContainer>
                    <Table
                        className={classes.table}
                        size="small"
                        aria-label="simple table"
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell>Food</TableCell>
                                <TableCell align="right">Calories</TableCell>
                                <TableCell align="right">
                                    Fat&nbsp;(g)
                                </TableCell>
                                <TableCell align="right">
                                    Carbs&nbsp;(g)
                                </TableCell>
                                <TableCell align="right">
                                    Protein&nbsp;(g)
                                </TableCell>
                                <TableCell align="right">
                                    Action&nbsp;
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {currentFoods.map((row, i) => (
                                <TableRow key={i}>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.fat * 9 +
                                            row.carbs * 4 +
                                            row.protein * 4}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.fat}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.carbs}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.protein}
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            onClick={() => {
                                                setUserData({
                                                    ...userData,
                                                    currentProtein:
                                                        userData.currentProtein -
                                                        currentFoods[i].protein,
                                                    currentCarbs:
                                                        userData.currentCarbs -
                                                        currentFoods[i].carbs,
                                                    currentFat:
                                                        userData.currentFat -
                                                        currentFoods[i].fat,
                                                })

                                                let temp = [...currentFoods]
                                                temp.splice(i, 1)
                                                setCurrentFoods(temp)
                                            }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            <TextField
                id="outlined-multiline-static"
                style={{ marginTop: 30, width: '30ch' }}
                label="Additional Notes"
                multiline
                rows={4}
                onChange={handleInputChange}
                value={inputValue}
                variant="outlined"
            />
            {currentFoods.length > 0 && (
                <Button
                    className={clsx(classes.marginTop)}
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                        setCurrentFoods([])
                        setUserData(user)
                    }}
                >
                    Reset
                </Button>
            )}
        </div>
    )
}

export default Nutrition
