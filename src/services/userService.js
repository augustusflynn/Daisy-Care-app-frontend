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

export const createUserService = (data) => {
    return axios.post("/api/create-new-user", data);
}

export const deleteUser = (userId) =>{ 
    return axios.delete('/api/delete-user', {
        // headers: {
        //     Authorization: au
        // },
        data: {
            id: userId 
        }
    })
}

export const editUser = (userInfo) => {
    return axios.put('/api/edit-user', userInfo)
}

export const getAllCodeService = (inputType) => {  
    return axios.get(`/api/allcode?type=${inputType}`)
}

export const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}

export const saveDoctorInfoService = (data) => {
    return axios.post(`/api/save-info-doctors`, data)
}

export const getAllDoctors = () => {
    return axios.get("/api/get-all-doctors")
}