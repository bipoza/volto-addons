
import {
    GET_ADDONS_SUCCESS,
    GET_ADDONS_FAILURE,
    GET_ADDONS_STARTED
} from './types';

import { DB_KEYS, API_ENDPOINT } from '../../constants';

import { getObject, setObject } from './../utils';
import getAwesomeVoltoToJSON from '../addons_repo_scrapper';
export const getAddonsList = () => {
    return async dispatch => {

        dispatch(getAddonsListStarted());
        getObject(DB_KEYS.ADDONS).then(addons => {
            if (addons) {
                dispatch(getAddonsListSuccess(addons));
            }
        })
        getAwesomeVoltoToJSON().then(res => {
            console.log("DATA: ", res)
            setObject(DB_KEYS.ADDONS, res);
            dispatch(getAddonsListSuccess(res));
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