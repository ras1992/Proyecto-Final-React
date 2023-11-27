import { createStore } from 'redux';

const initialState = {
    cargaCarro: null,
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ACTUALIZAR_NUM_CARRO':
            return { ...state, changeNum: action.payload };
        case 'CAMBIAR_SELECCION':
            return { ...state, actSeleccion: action.payload };
        default:
            return state;
    }
};

const store = createStore(rootReducer);

export default store;

