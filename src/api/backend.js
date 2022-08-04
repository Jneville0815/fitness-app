import axios from 'axios'

const localTesting = false

export const backend_url =
    'https://3cl6ts0f6f.execute-api.us-east-1.amazonaws.com/production/api'

export default axios.create({
    baseURL: localTesting ? 'http://localhost:2000/api' : backend_url,
})
