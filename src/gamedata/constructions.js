
import _ from 'lodash';

import { move } from "./passengers";

const buy = (state, item_key) => {
    console.log('buy', item_key);
    state.constructions[item_key]++;
    return state;
};

/* Balance:

        luggageCart: -
        escalator: 1
        fastRoad: 1
        dutyFree: 0.33
        bus: 1
        passport: 1
        security: 1
        checkIn: 1.25
        hotel: 0.1
        luggageLine: 1
        hall: 1.25
        runway: 1.5
        cafe: 1
        rail: 1
        parking: 1
        nowhere: -

 */


export const constructions = {
    bus: {
        key:         'bus',
        isDisabled:  (state, params = {}) => false,
        onClick:     (state, params = {}) => buy(state, 'bus'),
        onTick:      (state, params = {}) => {
            // some code
            state = move(state, {from: 'bus', to: 'escalator', predicate: passenger => passenger.dir === 'arrival', modifier: passenger => passenger});
            state = move(state, {from: 'bus', to: 'runway', predicate: passenger => passenger.dir === 'departure', modifier: passenger => passenger});
            return state;
        },
        name:        'Bus',
        cost:        {money: 14000},
        bandwidth:   25,
        processing_time: 15,
        description: 'Transports people from airport to a plane.'
    },

    checkIn: {
        key:         'checkIn',
        isDisabled:  (state, params = {}) => false,
        onClick:     (state, params = {}) => buy(state, 'checkIn'),
        onTick:      (state, params = {}) => {
            // to security
            state = move(state, {from: 'checkIn', to: 'security', predicate: passenger => true, modifier: passenger => passenger});
            return state;
        },
        name:        'Check-in',
        cost:        {money: 8000},
        bandwidth:   12,
        processing_time: 12,
        description: 'Allow passengers to register on a flight offline.'
    },

    dutyFree: {
        key:         'dutyFree',
        isDisabled:  (state, params = {}) => false,
        onClick:     (state, params = {}) => buy(state, 'dutyFree'),
        onTick:      (state, params = {}) => {
            // some code
            state = move(state, {from: 'dutyFree', to: 'escalator', predicate: passenger => true, modifier: passenger => passenger});
            return state;
        },
        name:        'Duty Free',
        cost:        {money: 14000},
        bandwidth:   10,
        processing_time: 20,
        description: 'Passengers can buy some gifts here while their flight is late.'
    },

    escalator: {
        key:         'escalator',
        isDisabled:  (state, params = {}) => state.escalator < 5,
        onClick:     (state, params = {}) => buy(state, 'escalator'),
        onTick:      (state, params = {}) => {
            // some code
            state = move(state, {from: 'escalator', to: 'passport', predicate: passenger => passenger.dir === 'arrival', modifier: passenger => passenger});
            state = move(state, {from: 'escalator', to: 'bus', predicate: passenger => passenger.dir === 'departure', modifier: passenger => passenger});
            return state;
        },
        name:        'Escalator',
        cost:        {money: 8000},
        bandwidth:   7,
        processing_time: 8,
        description: 'Transports people between floors.'
    },

    fastRoad: {
        key:         'fastRoad',
        isDisabled:  (state, params = {}) => false,
        onClick:     (state, params = {}) => buy(state, 'fastRoad'),
        onTick:      (state, params = {}) => {
            // some code
            state = move(state, {from: 'fastRoad', to: 'security', predicate: passenger => passenger.dir === 'arrival', modifier: passenger => passenger});
            state = move(state, {from: 'fastRoad', to: 'passport', predicate: passenger => passenger.dir === 'departure', modifier: passenger => passenger});
            return state;
        },
        name:        'Fast Road',
        cost:        {money: 10000},
        bandwidth:   10,
        processing_time: 10,
        description: 'Allows people to move faster between gates.'
    },

    hall: {
        key:         'hall',
        isDisabled:  (state, params = {}) => false,
        onClick:     (state, params = {}) => buy(state, 'hall'),
        onTick:      (state, params = {}) => {

            // arrival to taxi and rail
            state = move(state, {from: 'hall', to: 'parking', predicate: passenger => _.random(1, 4) === 1 && passenger.dir === 'arrival', modifier: passenger => passenger});
            state = move(state, {from: 'hall', to: 'rail', predicate: passenger => passenger.dir === 'arrival', modifier: passenger => passenger});

            // transfer to hotel and checkIn
            state = move(state, {from: 'hall', to: 'hotel', predicate: passenger => _.random(1, 20) === 1 || (_.random(1, 5) === 1 && passenger.dir === 'transfer'), modifier: passenger => passenger});
            state = move(state, {from: 'hall', to: 'checkIn', predicate: passenger => passenger.dir === 'transfer', modifier: passenger => passenger});

            // departure to checkIn
            state = move(state, {from: 'hall', to: 'checkIn', predicate: passenger => passenger.dir === 'departure', modifier: passenger => passenger});

            return state;
        },
        name:        'Hall',
        cost:        {money: 50000},
        bandwidth:   125,

        processing_time: 20,
        description: 'Common place for passengers to wait for their flight. Make sure it has enough benches.'
    },

    hotel: {
        key:         'hotel',
        isDisabled:  (state, params = {}) => false,
        onClick:     (state, params = {}) => buy(state, 'hotel'),
        onTick:      (state, params = {}) => {
            // some code
            state = move(state, {from: 'hotel', to: 'hall', predicate: passenger => true, modifier: passenger => passenger});
            return state;
        },
        name:        'Hotel',
        cost:        {money: 22000},
        bandwidth:   80,
        processing_time: 350,
        description: 'Passengers can have some rest here during a long transfer'
    },

    luggageCart: {
        key:         'luggageCart',
        isDisabled:  (state, params = {}) => false,
        onClick:     (state, params = {}) => buy(state, 'luggageCart'),
        onTick:      (state, params = {}) => {
            // some code
            return state;
        },
        name:        'Luggage Cart',
        cost:        {money: 1000000},
        bandwidth:   0,
        processing_time: 0,
        description: 'These cars drive luggage from the airport to a plane.'
    },

    luggageLine: {
        key:         'luggageLine',
        isDisabled:  (state, params = {}) => false,
        onClick:     (state, params = {}) => buy(state, 'luggageLine'),
        onTick:      (state, params = {}) => {
            // some code
            state = move(state, {from: 'luggageLine', to: 'hall', predicate: passenger => passenger.dir === 'arrival', modifier: passenger => passenger});
            return state;
        },
        name:        'Luggage Line',
        cost:        {money: 15000},
        bandwidth:   30,
        processing_time: 20,
        description: 'Passengers will take their luggage here'
    },

    nowhere: {
        key:         'nowhere',
        isDisabled:  (state, params = {}) => false,
        onTick:      (state, params = {}) => {
            // generate dirty departure passengers, pick clean arrival passengers
            // move dirty departure passengers to hall
            state.queue.nowhere = [];
            state.processing.nowhere = [];
            return state;
        },
        cost:        {money: 100},
        name:        'Nowhere',
        bandwidth:   0,
        processing_time: 0,
        description: 'People are suddenly dissapears here'
    },

    parking: {
        key:         'parking',
        isDisabled:  (state, params = {}) => false,
        onClick:     (state, params = {}) => buy(state, 'parking'),
        onTick:      (state, params = {}) => {
            // generate dirty departure passengers, pick clean arrival passengers
            // move dirty departure passengers to hall
            state = move(state, {from: 'parking', to: 'hall', predicate: passenger => passenger.dir === 'departure', modifier: passenger => passenger});
            state = move(state, {from: 'parking', to: 'nowhere', predicate: passenger => passenger.dir === 'arrival', modifier: passenger => passenger});
            return state;
        },
        name:        'Parking',
        cost:        {money: 20000},
        bandwidth:   20,
        processing_time: 10,
        description: 'People are coming here from a city.'
    },

    passport: {
        key:         'passport',
        isDisabled:  (state, params = {}) => false,
        onClick:     (state, params = {}) => buy(state, 'passport'),
        onTick:      (state, params = {}) => {
            // some code
            state = move(state, {from: 'passport', to: 'fastRoad', predicate: passenger => passenger.dir === 'arrival', modifier: passenger => passenger});
            state = move(state, {from: 'passport', to: 'dutyFree', predicate: passenger => _.random(1, 3) === 1 && passenger.dir === 'departure', modifier: passenger => passenger});
            state = move(state, {from: 'passport', to: 'bus', predicate: passenger => passenger.dir === 'departure', modifier: passenger => passenger});
            return state;
        },
        name:        'Passport Control',
        cost:        {money: 4000},
        bandwidth:   2,
        processing_time: 5,
        description: 'Checks that passengers have valid documents to cross over the country.'
    },

    rail: {
        key:         'rail',
        isDisabled:  (state, params = {}) => false,
        onClick:     (state, params = {}) => buy(state, 'rail'),
        onTick:      (state, params = {}) => {
            // generate dirty departure passengers, pick clean arrival passengers
            // move dirty departure passengers to hall
            state = move(state, {from: 'rail', to: 'hall', predicate: passenger => passenger.dir === 'departure', modifier: passenger => passenger});
            state = move(state, {from: 'rail', to: 'nowhere', predicate: passenger => passenger.dir === 'arrival', modifier: passenger => passenger});
            return state;
        },
        name:        'Rail',
        cost:        {money: 30000},
        bandwidth:   50,
        processing_time: 16,
        description: 'This rail transports passengers from a city to the airport.'
    },

    runway: {
        key:         'runway',
        isDisabled:  (state, params = {}) => false,
        onClick:     (state, params = {}) => buy(state, 'runway'),
        onTick:      (state, params = {}) => {
            // some code
            state = move(state, {from: 'runway', to: 'bus', predicate: passenger => passenger.dir === 'arrival', modifier: passenger => passenger});
            state = move(state, {from: 'runway', to: 'nowhere', predicate: passenger => passenger.dir === 'departure', modifier: passenger => passenger});
            return state;
        },
        name:        'Runway',
        cost:        {money: 42000},
        bandwidth:   128,
        processing_time: 20,
        description: 'The main airport construction. The more runways you have the more flights you can accept.'
    },

    security: {
        key:         'security',
        isDisabled:  (state, params = {}) => false,
        onClick:     (state, params = {}) => buy(state, 'security'),
        onTick:      (state, params = {}) => {
            // to baggage line
            state = move(state, {from: 'security', to: 'luggageLine', predicate: passenger => passenger.dir === 'arrival', modifier: passenger => passenger});
            state = move(state, {from: 'security', to: 'fastRoad', predicate: passenger => passenger.dir === 'departure', modifier: passenger => passenger});
            return state;
        },
        name:        'Security',
        cost:        {money: 4000},
        bandwidth:   4,
        processing_time: 10,
        description: 'Provides security check of passengers and their carryon.'
    },
};

_.each(constructions, (construction, key) => {
    console.log(construction.key, (10000 * construction.bandwidth / construction.processing_time / construction.cost.money));
});
