
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
        cost:        {money: 1620},
        bandwidth:   20,
        threshold:   20,
        processing_time: 5,
        description: 'These cars drive luggage from the airport to a plane.'
    },

    escalator: {
        key:         'escalator',
        isDisabled:  (state, params = {}) => state.escalator < 5,
        onClick:     (state, params = {}) => buy(state, 'escalator'),
        onTick:      (state, params = {}) => {
            // some code
            state = move(state, {from: 'escalator', to: 'passport'}, passenger => passenger.dir === 'arrival');
            state = move(state, {from: 'escalator', to: 'bus'}, passenger => passenger.dir === 'departure');
            return state;
        },
        name:        'Escalator',
        cost:        {money: 800},
        bandwidth:   20,
        threshold:   20,
        processing_time: 5,
        description: 'Transports people between floors.'
    },

    fastRoad: {
        key:         'fastRoad',
        isDisabled:  (state, params = {}) => false,
        onClick:     (state, params = {}) => buy(state, 'fastRoad'),
        onTick:      (state, params = {}) => {
            // some code
            state = move(state, {from: 'fastRoad', to: 'security'}, passenger => passenger.dir === 'arrival');
            state = move(state, {from: 'fastRoad', to: 'passport'}, passenger => passenger.dir === 'departure');
            return state;
        },
        name:        'Fast Road',
        cost:        {money: 800},
        bandwidth:   20,
        threshold:   20,
        processing_time: 5,
        description: 'Allows people to move faster between gates.'
    },

    dutyFree: {
        key:         'dutyFree',
        isDisabled:  (state, params = {}) => false,
        onClick:     (state, params = {}) => buy(state, 'dutyFree'),
        onTick:      (state, params = {}) => {
            // some code
            state = move(state, {from: 'dutyFree', to: 'escalator'});
            return state;
        },
        name:        'Duty Free',
        cost:        {money: 3000},
        bandwidth:   50,
        threshold:   20,
        processing_time: 5,
        description: 'Passengers can buy some gifts here while their flight is late.'
    },

    bus: {
        key:         'bus',
        isDisabled:  (state, params = {}) => false,
        onClick:     (state, params = {}) => buy(state, 'bus'),
        onTick:      (state, params = {}) => {
            // some code
            state = move(state, {from: 'bus', to: 'escalator'}, passenger => passenger.dir === 'arrival');
            state = move(state, {from: 'bus', to: 'runway'}, passenger => passenger.dir === 'departure');
            return state;
        },
        name:        'Bus',
        cost:        {money: 800},
        bandwidth:   20,
        threshold:   20,
        processing_time: 5,
        description: 'Transports people from airport to a plane.'
    },

    passport: {
        key:         'passport',
        isDisabled:  (state, params = {}) => false,
        onClick:     (state, params = {}) => buy(state, 'passport'),
        onTick:      (state, params = {}) => {
            // some code
            state = move(state, {from: 'passport', to: 'fastRoad'}, passenger => passenger.dir === 'arrival');
            state = move(state, {from: 'passport', to: 'dutyFree'}, passenger => passenger.dir === 'departure');
            return state;
        },
        name:        'Passport Control',
        cost:        {money: 800},
        bandwidth:   20,
        threshold:   20,
        processing_time: 5,
        description: 'Checks that passengers have valid documents to cross over the country.'
    },

    security: {
        key:         'security',
        isDisabled:  (state, params = {}) => false,
        onClick:     (state, params = {}) => buy(state, 'security'),
        onTick:      (state, params = {}) => {
            // to baggage line
            state = move(state, {from: 'security', to: 'luggageLine'}, passenger => passenger.dir === 'arrival');
            state = move(state, {from: 'security', to: 'fastRoad'}, passenger => passenger.dir === 'departure');
            return state;
        },
        name:        'Security',
        cost:        {money: 800},
        bandwidth:   20,
        threshold:   20,
        processing_time: 5,
        description: 'Provides security check of passengers and their carryon.'
    },

    checkIn: {
        key:         'checkIn',
        isDisabled:  (state, params = {}) => false,
        onClick:     (state, params = {}) => buy(state, 'checkIn'),
        onTick:      (state, params = {}) => {
            // to security
            state = move(state, {from: 'checkIn', next: 'security'});
            return state;
        },
        name:        'Check-in',
        cost:        {money: 800},
        bandwidth:   20,
        threshold:   20,
        processing_time: 5,
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
        cost:        {money: 800},
        bandwidth:   20,
        threshold:   20,
        processing_time: 360,
        description: 'Passengers can have some rest here during a long transfer'
    },

    luggageLine: {
        key:         'luggageLine',
        isDisabled:  (state, params = {}) => false,
        onClick:     (state, params = {}) => buy(state, 'luggageLine'),
        onTick:      (state, params = {}) => {
            // some code
            state = move(state, {from: 'luggageLine', to: 'hall'}, passenger => passenger.dir === 'arrival');
            return state;
        },
        name:        'Luggage Line',
        cost:        {money: 800},
        bandwidth:   6,
        threshold:   20,
        processing_time: 5,
        description: 'Passengers will take their luggage here'
    },

    hall: {
        key:         'hall',
        isDisabled:  (state, params = {}) => false,
        onClick:     (state, params = {}) => buy(state, 'hall'),
        onTick:      (state, params = {}) => {
            // all to cafe
            state = move(state, {from: 'hall', next: 'cafe'}, passenger => _.random(1, 10) === 1);

            // arrival to taxi and rail
            state = move(state, {from: 'hall', next: 'parking'}, passenger => _.random(1, 4) === 1 && passenger.dir === 'arrival');
            state = move(state, {from: 'hall', next: 'rail'}, passenger => passenger.dir === 'arrival');

            // transfer to hotel and checkIn
            state = move(state, {from: 'hall', next: 'hotel'}, passenger => _.random(1, 7) === 1 && passenger.dir === 'transfer');
            state = move(state, {from: 'hall', next: 'checkIn'}, passenger => passenger.dir === 'transfer');

            // departure to checkIn
            state = move(state, {from: 'hall', next: 'checkIn'}, passenger => passenger.dir === 'departure');

            return state;
        },
        name:        'Hall',
        cost:        {money: 800},
        bandwidth:   20,
        threshold:   20,
        processing_time: 5,
        description: 'Common place for passengers to wait for their flight. Make sure it has enough benches.'
    },

    runway: {
        key:         'runway',
        isDisabled:  (state, params = {}) => false,
        onClick:     (state, params = {}) => buy(state, 'runway'),
        onTick:      (state, params = {}) => {
            // some code
            state = move(state, {from: 'runway', to: 'bus'});
            return state;
        },
        name:        'Runway',
        cost:        {money: 800},
        bandwidth:   100,
        threshold:   20,
        processing_time: 10,
        description: 'The main airport construction. The more runways you have the more flights you can accept.'
    },


    // wait till your time
    cafe: {
        key:         'cafe',
        isDisabled:  (state, params = {}) => false,
        onClick:     (state, params = {}) => buy(state, 'cafe'),
        onTick:      (state, params = {}) => {
            // some code
            return state;
        },
        name:        'Cafe',
        cost:        {money: 800},
        bandwidth:   10,
        threshold:   20,
        processing_time: 10,
        description: 'Passengers can drink here until they stop worry about their flight'
    },

    rail: {
        key:         'rail',
        isDisabled:  (state, params = {}) => false,
        onClick:     (state, params = {}) => buy(state, 'rail'),
        onTick:      (state, params = {}) => {
            // generate dirty departure passengers, pick clean arrival passengers
            // move dirty departure passengers to hall
            state = move(state, {from: 'rail', to: 'hall'});
            return state;
        },
        name:        'Rail',
        cost:        {money: 800},
        bandwidth:   50,
        threshold:   10,
        processing_time: 12,
        description: 'This rail transports passengers from a city to the airport.'
    },

    parking: {
        key:         'parking',
        isDisabled:  (state, params = {}) => false,
        onClick:     (state, params = {}) => buy(state, 'parking'),
        onTick:      (state, params = {}) => {
            // generate dirty departure passengers, pick clean arrival passengers
            // move dirty departure passengers to hall
            state = move(state, {from: 'parking', to: 'hall'});
            return state;
        },
        name:        'Parking',
        cost:        {money: 800},
        bandwidth:   20,
        threshold:   5,
        processing_time: 5,
        description: 'People are coming here from a city.'
    },
};
