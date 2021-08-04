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
    macros: {
        display: 'flex',
        flexDirection: 'row',
        width: '35ch',
        justifyContent: 'space-between',
    },
    textField: {
        width: '25ch',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    table: {
        minWidth: 650,
        maxWidth: 650,
        margin: '0 auto',
    },
    addContainer: {
        marginBottom: 10,
        display: 'flex',
        alignItems: 'flex-start',
    },
}))

export default useStyles
