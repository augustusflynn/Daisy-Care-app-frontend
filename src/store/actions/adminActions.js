import actionTypes from './actionTypes';
import { getAllCodeService } from '../../services/userService'

export const fetchGenderStart = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })

            let res = await getAllCodeService('GENDER')
            if(res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data))
            } else {
                dispatch(fetchGenderFailed())
            }
        }catch(e){
            dispatch(fetchGenderFailed())
            console.log("Fetch data failed", e)
        }
    }
}

export const fetchPostionStart = () => {
    return async (dispatch) => {
        try {

            let res = await getAllCodeService('POSITION')
            if(res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data))
            } else {
                dispatch(fetchPositionFailed())
            }
        }catch(e){
            dispatch(fetchPositionFailed())
            console.log("Fetch data failed", e)
        }
    }
}

export const fetchRoleStart = () => {
    return async (dispatch) => {
        try {

            let res = await getAllCodeService('ROLE')
            if(res && res.errCode === 0) {
                dispatch(fetchRoleRuccess(res.data))
            } else {
                dispatch(fetchRoleRuccess())
            }
        }catch(e){
            dispatch(fetchRoleRuccess())
            console.log("Fetch data failed", e)
        }
    }
}

export const fetchGenderSuccess = (data) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data:data
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAIL
})

export const fetchPositionSuccess = (data) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data:data
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAIL
})


export const fetchRoleRuccess = (data) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data:data
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAIL
})
