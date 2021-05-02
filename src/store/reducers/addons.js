import {
    GET_ADDONS_SUCCESS,
    GET_ADDONS_FAILURE,
    GET_ADDONS_STARTED,
} from '../actions/types';

const initialState = {
    loading: false,
    all_addons: [],
    categories: [],
    error: null
};

export default function addons(state = initialState, action) {
    switch (action.type) {
        case GET_ADDONS_STARTED:
            return {
                ...state,
                loading: true
            };
        case GET_ADDONS_SUCCESS:
            console.log(action)
            return {
                ...state,
                loading: false,
                error: null,
                addons: [].concat.apply([], action.payload.data.map(categories => {
                    return categories['data'].map(item => {
                        return {
                            title: item.title,
                            description:item.description,
                            url:item.url,
                            category:categories.title
                        }
                    })
                })),
                categories: [].concat.apply([], action.payload.data.map(item => {
                    return {
                        title: item.title,
                        description: item.description
                    }
                }))
            };
        case GET_ADDONS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };

        default:
            return state;
    }
}
