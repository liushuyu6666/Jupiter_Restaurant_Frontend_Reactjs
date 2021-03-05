import {SET_PROFILE} from './actionTypes';

export const setProfile = profile => (
    {
        type: SET_PROFILE,
        payload: profile,
    }
)