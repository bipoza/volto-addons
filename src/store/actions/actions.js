
import {
    GET_ADDONS_SUCCESS,
    GET_ADDONS_FAILURE,
    GET_ADDONS_STARTED
} from './types';
import axios from 'axios';

import { DB_KEYS, CACHE_ENDPOINT } from '../../constants';

import { getObject, setObject } from './../utils';

export const getAddonsList = () => {
    return async dispatch => {
        dispatch(getAddonsListStarted());
        getObject(DB_KEYS.ADDONS).then(addons => {
            if (addons) {
                dispatch(getAddonsListSuccess(addons));
            }
        })
        axios.get(CACHE_ENDPOINT).then(async res => {
            console.log("DATA: ", res.data)
            setObject(DB_KEYS.ADDONS, res.data);
            dispatch(getAddonsListSuccess(res.data));
        }).catch(err => {
            dispatch(getAddonsListFailure(err.message));
        });
    };
};

const getAddonsListSuccess = data => ({
    type: GET_ADDONS_SUCCESS,
    payload: {
        data
    }
});

const getAddonsListStarted = () => ({
    type: GET_ADDONS_STARTED
});

const getAddonsListFailure = error => ({
    type: GET_ADDONS_FAILURE,
    payload: {
        error
    }
});