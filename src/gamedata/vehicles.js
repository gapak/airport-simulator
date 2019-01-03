
import _ from 'lodash';

export var vehicles = {};

const move = (state, params) => {
    

    return state;
};


const gen_passenger = (direction) => {
    return {name: 'Name_' + _.random(111, 999), direction: direction, dirty: true};
};




vehicles = {
    aircraft: {
        key:         'aircraft',
        onTick:      (state, params = {}) => {
            // generate dirty arrival and dirty transfer passengers, pick clean departure and clean transfer passengers
            if (state.frame % 40 === 0) {
                let new_passengers = [];
                _.times(_.random(16, 100), () => {
                    new_passengers.push(gen_passenger(_.random(1, 2) === 1 ? 'arrival' : 'transfer'));
                });
                state.queue.runway = _.concat(state.queue.runway, new_passengers);
            }
            return state;
        },

    },

    train: {
        key:         'train',
        onTick:      (state, params = {}) => {
            // generate dirty departure passengers, pick clean arrival passengers
            if (state.frame % 15 === 0) {
                let new_passengers = [];
                _.times(_.random(5, 25), () => {
                    new_passengers.push(gen_passenger('departure'));
                });
                state.queue.rail = _.concat(state.queue.rail, new_passengers);
            }
            return state;
        },

    },

    taxi: {
        key:         'taxi',
        onTick:      (state, params = {}) => {
            // generate dirty departure passengers, pick clean arrival passengers
            if (state.frame % 6 === 0) {
                let new_passengers = [];
                _.times(_.random(1, 4), () => {
                    new_passengers.push(gen_passenger('departure'));
                });
                state.queue.parking = _.concat(state.queue.parking, new_passengers);
            }
            return state;
        },

    },

};