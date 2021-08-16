import axios from 'axios'

const localTesting = false

export default axios.create({
    baseURL: localTesting
        ? 'http://localhost:2000/api'
        : 'https://fek7pqfdl7.execute-api.us-east-1.amazonaws.com/prod//api',
})
