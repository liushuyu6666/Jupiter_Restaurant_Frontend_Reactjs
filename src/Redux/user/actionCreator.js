import {SET_PROFILE, DELETE_PROFILE} from './actionTypes';

export const setProfile = profile => (
    {
        type: SET_PROFILE,
        payload: profile,
    }
)

export const deleteProfile = () => (
    {
        type: DELETE_PROFILE,
    }
)