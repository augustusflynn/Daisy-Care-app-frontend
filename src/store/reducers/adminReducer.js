import actionTypes from '../actions/actionTypes';

const initialState = {
    genders: [],
    roles: [],
    positions: [],
    isLoading: false
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                genders: action.data
            }
        case actionTypes.FETCH_POSITION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                positions: action.data
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                roles: action.data
            }
        case actionTypes.FETCH_GENDER_FAIL:
            return {
                ...state,
                isLoading: false
            }
        case actionTypes.FETCH_POSITION_FAIL:
            return {
                ...state,
                isLoading: false
            }
            case actionTypes.FETCH_ROLE_FAIL:
        return {
            ...state,
            isLoading: false
        }
        default:
            return state;
    }
}

export default adminReducer;