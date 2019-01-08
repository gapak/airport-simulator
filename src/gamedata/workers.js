import _ from 'lodash';

const hire = (state, item_key) => {
    console.log('hire', item_key);
    state.workers.length++;
    return state;
};

const fire = (state, item_key) => {
    console.log('fire', item_key);
    if (state.workers.length > 0) {
        state.workers.length--;
    }
    return state;
};

export const workers = {
    hire: {
        key:         'hire',
        isDisabled:  (state, params = {}) => false,
        onClick:     (state, params = {}) => hire(state, 'worker'),
        onTick:      (state, params = {}) => {
            // some code
            return state;
        },
        cost:        {money: 0},
        description: ''
    },

    fire: {
        key:         'fire',
        isDisabled:  (state, params = {}) => false,
        onClick:     (state, params = {}) => fire(state, 'worker'),
        onTick:      (state, params = {}) => {
            // some code
            return state;
        },
        cost:        {money: 0},
        description: ''
    }
}

