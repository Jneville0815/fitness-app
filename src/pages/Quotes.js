import React, { useContext, useState } from 'react'
import TextField from '@material-ui/core/TextField'
import clsx from 'clsx'
import useStyles from './styles'
import Button from '@material-ui/core/Button'
import backend from '../api/backend'
import { Context } from '../context/Store'
import { backend_url } from '../api/backend'

const Quotes = () => {
    const [source, setSource] = useState('')
    const [quote, setQuote] = useState('')

    const [showSuccessMessage, setShowSuccessMessage] = useState(false)
    const [showFailureMessage, setShowFailureMessage] = useState(false)

    const [state, dispatch] = useContext(Context)

    const classes = useStyles()

    const displayFailure = () => {
        setShowFailureMessage(true)
        setTimeout(() => {
            setShowFailureMessage(false)
        }, 2000)
    }

    const addQuote = async (source, quote) => {
        if (source.length > 0 && quote.length > 0) {
            try {
                const response = await backend.post(
                    `/userInfo/${state.user_id}/addQuote`,
                    {
                        source,
                        quote,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${state.apiToken}`,
                        },
                    }
                )
                if (response.status === 200) {
                    setSource('')
                    setQuote('')
                    setShowSuccessMessage(true)
                    setTimeout(() => {
                        setShowSuccessMessage(false)
                    }, 2000)
                    console.log('Success')
                } else {
                    displayFailure()
                }
            } catch (err) {
                displayFailure()
                console.log(err)
            }
        } else {
            displayFailure()
        }
    }

    return (
        <div className={clsx(classes.root)}>
            <TextField
                id="outlined-multiline-static"
                style={{ marginTop: 30, width: '30ch' }}
                label="Insert Source"
                onChange={(e) => setSource(e.target.value)}
                value={source}
                variant="outlined"
            />
            <TextField
                id="outlined-multiline-static"
                style={{ marginTop: 30, width: '30ch' }}
                label="Insert Quote"
                multiline
                rows={4}
                onChange={(e) => setQuote(e.target.value)}
                value={quote}
                variant="outlined"
            />
            <Button
                className={clsx(classes.marginTop)}
                variant="contained"
                color="primary"
                onClick={() => addQuote(source, quote)}
            >
                Add
            </Button>
            {showSuccessMessage && (
                <p
                    style={{
                        color: 'green',
                        marginBottom: 0,
                    }}
                >
                    Success
                </p>
            )}
            {showFailureMessage && (
                <p
                    style={{
                        color: 'red',
                        marginBottom: 0,
                    }}
                >
                    Fail
                </p>
            )}
            <a
                className={clsx(classes.marginTop)}
                target="_blank"
                href={`${backend_url}/userInfo/${state.user_id}/getAllQuotes`}
            >
                Get All Quotes
            </a>
        </div>
    )
}

export default Quotes
