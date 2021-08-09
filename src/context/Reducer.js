const Reducer = (state, action) => {
    switch (action.type) {
        case 'SET_TOKEN':
            return {
                ...state,
                apiToken: action.payload,
            }
        case 'SET_EMAIL':
            return {
                ...state,
                email: action.payload,
            }
        case 'SIGN_OUT':
            return {
                apiToken: '',
                email: '',
            }
        default:
            return state
    }
}

export default Reducer
