
import _ from 'lodash';

import { move } from "./passengers";

const buy = (state, item_key) => {
    console.log('buy', item_key);
    state.constructions[item_key]++;
    return state;
};


export const constructions = {
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
        cost:        {money: 6000},
        bandwidth:   12,
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
        cost:        {money: 8000},
        bandwidth:   24,
        processing_time: 12,
        description: 'Allows people to move faster between gates.'
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
        cost:        {money: 12000},
        bandwidth:   12,
        processing_time: 20,
        description: 'Passengers can buy some gifts here while their flight is late.'
    },

    bus: {
        key:         'bus',
        isDisabled:  (state, params = {}) => false,
        onClick:     (state, params = {}) => buy(state, 'bus'),
        onTick:      (state, params = {}) => {
            // some code
            state = move(state, {from: 'bus', to: 'escalator', predicate: passenger => passenger.dir === 'arrival', modifier: passenger => passenger});
            state = move(state, {from: 'bus', to: 'runway', predicate: passenger => passenger.dir === 'departure', modifier: passenger => passenger});

            state = move(state, {from: 'bus', to: 'escalator', predicate: passenger => passenger.dir === 'arrival', modifier: passenger => passenger});
            state = move(state, {from: 'bus', to: 'runway', predicate: passenger => passenger.dir === 'departure', modifier: passenger => passenger});
            return state;
        },
        name:        'Bus',
        cost:        {money: 8000},
        bandwidth:   30,
        processing_time: 15,
        description: 'Transports people from airport to a plane.'
    },

    passport: {
        key:         'passport',
        isDisabled:  (state, params = {}) => false,
        onClick:     (state, params = {}) => buy(state, 'passport'),
        onTick:      (state, params = {}) => {
            // some code
            state = move(state, {from: 'passport', to: 'fastRoad', predicate: passenger => passenger.dir === 'arrival', modifier: passenger => passenger});
            state = move(state, {from: 'passport', to: 'dutyFree', predicate: passenger => passenger.dir === 'departure', modifier: passenger => passenger});
            return state;
        },
        name:        'Passport Control',
        cost:        {money: 2000},
        bandwidth:   2,
        processing_time: 5,
        description: 'Checks that passengers have valid documents to cross over the country.'
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
        bandwidth:   8,
        processing_time: 8,
        description: 'Provides security check of passengers and their carryon.'
    },

    checkIn: {
        key:         'checkIn',
        isDisabled:  (state, params = {}) => false,
        onClick:     (state, params = {}) => buy(state, 'checkIn'),
        onTick:      (state, params = {}) => {
            // to security
            state = move(state, {from: 'checkIn', next: 'security', predicate: passenger => true, modifier: passenger => passenger});
            return state;
        },
        name:        'Check-in',
        cost:        {money: 16000},
        bandwidth:   10,
        processing_time: 15,
        description: 'Allow passengers to register on a flight offline.'
    },

    hotel: {
        key:         'hotel',
        isDisabled:  (state, params = {}) => false,
        onClick:     (state, params = {}) => buy(state, 'hotel'),
        onTick:      (state, params = {}) => {
            // some code
            return state;
        },
        name:        'Hotel',
        cost:        {money: 24000},
        bandwidth:   16,
        processing_time: 720,
        description: 'Passengers can have some rest here during a long transfer'
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
        cost:        {money: 14000},
        bandwidth:   64,
        processing_time: 24,
        description: 'Passengers will take their luggage here'
    },

    hall: {
        key:         'hall',
        isDisabled:  (state, params = {}) => false,
        onClick:     (state, params = {}) => buy(state, 'hall'),
        onTick:      (state, params = {}) => {

            // arrival to taxi and rail
            state = move(state, {from: 'hall', next: 'parking', predicate: passenger => passenger.dir === 'arrival', modifier: passenger => passenger}, passenger => _.random(1, 4) === 1 && passenger.dir === 'arrival');
            state = move(state, {from: 'hall', next: 'rail', predicate: passenger => passenger.dir === 'arrival', modifier: passenger => passenger});

            // transfer to hotel and checkIn
            state = move(state, {from: 'hall', next: 'hotel', predicate: passenger => passenger.dir === 'transfer', modifier: passenger => passenger}, passenger => _.random(1, 20) === 1 || (_.random(1, 5) === 1 && passenger.dir === 'transfer'));
            state = move(state, {from: 'hall', next: 'checkIn', predicate: passenger => passenger.dir === 'transfer', modifier: passenger => passenger}, passenger => passenger.dir === 'transfer');

            // departure to checkIn
            state = move(state, {from: 'hall', next: 'checkIn', predicate: passenger => passenger.dir === 'departure', modifier: passenger => passenger});

            return state;
        },
        name:        'Hall',
        cost:        {money: 42000},
        bandwidth:   128,

        processing_time: 12,
        description: 'Common place for passengers to wait for their flight. Make sure it has enough benches.'
    },

    runway: {
        key:         'runway',
        isDisabled:  (state, params = {}) => false,
        onClick:     (state, params = {}) => buy(state, 'runway'),
        onTick:      (state, params = {}) => {
            // some code
            state = move(state, {from: 'runway', to: 'bus', predicate: passenger => true, modifier: passenger => passenger});
            return state;
        },
        name:        'Runway',
        cost:        {money: 28000},
        bandwidth:   100,
        processing_time: 10,
        description: 'The main airport construction. The more runways you have the more flights you can accept.'
    },

    rail: {
        key:         'rail',
        isDisabled:  (state, params = {}) => false,
        onClick:     (state, params = {}) => buy(state, 'rail'),
        onTick:      (state, params = {}) => {
            // generate dirty departure passengers, pick clean arrival passengers
            // move dirty departure passengers to hall
            state = move(state, {from: 'rail', to: 'hall', predicate: passenger => true, modifier: passenger => passenger});
            return state;
        },
        name:        'Rail',
        cost:        {money: 22000},
        bandwidth:   56,
        processing_time: 16,
        description: 'This rail transports passengers from a city to the airport.'
    },

    parking: {
        key:         'parking',
        isDisabled:  (state, params = {}) => false,
        onClick:     (state, params = {}) => buy(state, 'parking'),
        onTick:      (state, params = {}) => {
            // generate dirty departure passengers, pick clean arrival passengers
            // move dirty departure passengers to hall
            state = move(state, {from: 'parking', to: 'hall', predicate: passenger => true, modifier: passenger => passenger});
            return state;
        },
        name:        'Parking',
        cost:        {money: 6000},
        bandwidth:   12,
        processing_time: 8,
        description: 'People are coming here from a city.'
    },
};

_.each(constructions, (construction, key) => {
    console.log(construction.key, (10000 * construction.bandwidth / construction.processing_time / construction.cost.money));
});
