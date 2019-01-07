
import _ from 'lodash';

const gen_passenger = (direction) => {
    return {dir: direction};
};

export const vehicles = {
    aircraft: {
        key:         'aircraft',
        onTick:      (state, params = {}) => {
            // generate dirty arrival and dirty transfer passengers, pick clean departure and clean transfer passengers
            if (state.frame % 40 === 0) {
                let new_passengers = [];
                _.times(_.random(17, 69 + Math.floor(state.tick / 10)), () => {
                    //new_passengers.push(gen_passenger(_.random(1, 2) === 1 ? 'arrival' : 'transfer'));
                    new_passengers.push(gen_passenger('arrival'));
                });
                state.queue.runway = _.concat(state.queue.runway, new_passengers);

                state.money += new_passengers.length * 10;
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
                _.times(_.random(4, 16 + Math.floor(state.tick / 30)), () => {
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
                _.times(_.random(1, 3 + Math.floor(state.tick / 100)), () => {
                    new_passengers.push(gen_passenger('departure'));
                });
                state.queue.parking = _.concat(state.queue.parking, new_passengers);
            }
            return state;
        },

    },

};