//import { combineReducers } from 'redux';

const actions = {
    show: 'show',
    hide: 'hide',
    fetch: 'fetch',
    set: 'set'
};

export const actionsCreators = {
    ocultar: () => ({
        type: actions.hide
    }),
    saludar: (message) => ({
        type: actions.show,
        message: message
    }),
    fetch: () => ({
        type: actions.fetch
    }),
    set: (data) => ({
        type: actions.set,
        data: data
    }),
    consultar: () => (dispatch) => (
        new Promise(() => {
            dispatch(actionsCreators.fetch());
            fetch('http://localhost:4400/fake')
                .then((response) => response.json())
                .then((result) => {
                    dispatch(actionsCreators.set(result.data));
                })
                .catch((error) => {
                    console.log(error);
                })
        })
    )
}

export default (state = {
    show: false,
    message: '',
    data: []
}, action) => {
    switch (action.type) {
        case actions.set:
            return { ...state, data: action.data }
        case actions.show:
            return { ...state, show: true, message: action.message };
        case actions.hide:
            return { ...state, show: false };
        default:
            return state;
    }
};
