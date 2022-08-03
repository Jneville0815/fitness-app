import axios from 'axios'

const localTesting = false

export default axios.create({
    baseURL: localTesting
        ? 'http://localhost:2000/api'
        : 'https://3cl6ts0f6f.execute-api.us-east-1.amazonaws.com/production/api',
})
