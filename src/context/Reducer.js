const Reducer = (state, action) => {
    switch (action.type) {
        case 'SET_TOKEN':
            return {
                ...state,
                apiToken: action.payload,
            }
        case 'SET_USER_ID':
            return {
                ...state,
                user_id: action.payload,
            }
        case 'SIGN_OUT':
            return {
                apiToken: '',
                user_id: '',
            }
        default:
            return state
    }
}

export default Reducer
