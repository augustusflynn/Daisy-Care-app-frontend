import axios from '../axios'

export const handleLogin = (userEmail, userPassword) => { 
    return axios.post('/api/login', {
        email: userEmail,
        password: userPassword
    })
} 

export const getAllUser = (userId) => {
    return axios.get(`/api/get-all-users?id=${userId}`)
}
