
import _ from 'lodash';

import { move } from "./passengers";

const buy = (state, item_key) => {
    console.log('buy', item_key);
    state.constructions[item_key]++;
    return state;
};


export const constructions = {
    innerLuggageCart: {
        key:         'innerLuggageCart',
        isDisabled:  (state, params = {}) => false,
        onClick:     (state, params = {}) => buy(state, 'innerLuggageCart'),
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

    outLuggageCart: {
        key:         'outLuggageCart',
        isDisabled:  (state, params = {}) => false,
        onClick:     (state, params = {}) => buy(state, 'outLuggageCart'),
        onTick:      (state, params = {}) => {
            // some code
            return state;
        },
        name:        'Luggage Cart',
        cost:        {money: 1620},
        bandwidth:   20,
        threshold:   20,
        processing_time: 5,
        description: 'These cars drive luggage from a plane to the airport.'
    },

    innerEscalator: {
        key:         'innerEscalator',
        isDisabled:  (state, params = {}) => state.innerEscalator < 5,
        onClick:     (state, params = {}) => buy(state, 'innerEscalator'),
        onTick:      (state, params = {}) => {
            // some code
            return state;
        },
        name:        'Escalator',
        cost:        {money: 800},
        bandwidth:   20,
        threshold:   20,
        processing_time: 5,
        description: 'Transports people between floors.'
    },

    outEscalator: {
        key:         'outEscalator',
        isDisabled:  (state, params = {}) => false,
        onClick:     (state, params = {}) => buy(state, 'outEscalator'),
        onTick:      (state, params = {}) => {
            // some code
            return state;
        },
        name:        'Escalator',
        cost:        {money: 800},
        bandwidth:   20,
        threshold:   20,
        processing_time: 5,
        description: 'Transports people between floors.'
    },

    innerFastRoad: {
        key:         'innerFastRoad',
        isDisabled:  (state, params = {}) => false,
        onClick:     (state, params = {}) => buy(state, 'innerFastRoad'),
        onTick:      (state, params = {}) => {
            // some code
            return state;
        },
        name:        'Fast Road',
        cost:        {money: 800},
        bandwidth:   20,
        threshold:   20,
        processing_time: 5,
        description: 'Allows people to move faster between gates.'
    },

    outFastRoad: {
        key:         'outFastRoad',
        isDisabled:  (state, params = {}) => false,
        onClick:     (state, params = {}) => buy(state, 'outFastRoad'),
        onTick:      (state, params = {}) => {
            // some code
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
            return state;
        },
        name:        'Duty Free',
        cost:        {money: 3000},
        bandwidth:   50,
        threshold:   20,
        processing_time: 5,
        description: 'Passengers can buy some gifts here while their flight is late.'
    },

    innerBus: {
        key:         'innerBus',
        isDisabled:  (state, params = {}) => false,
        onClick:     (state, params = {}) => buy(state, 'innerBus'),
        onTick:      (state, params = {}) => {
            // some code
            state = move(state, {from: 'innerBus', to: 'innerPassport'});
            return state;
        },
        name:        'Bus',
        cost:        {money: 800},
        bandwidth:   20,
        threshold:   20,
        processing_time: 5,
        description: 'Transports people from airport to a plane.'
    },

    outBus: {
        key:         'outBus',
        isDisabled:  (state, params = {}) => false,
        onClick:     (state, params = {}) => buy(state, 'outBus'),
        onTick:      (state, params = {}) => {
            // some code
            return state;
        },
        name:        'Bus',
        cost:        {money: 800},
        bandwidth:   20,
        threshold:   20,
        processing_time: 5,
        description: 'Transports people from plane to the airport.'
    },

    innerPassport: {
        key:         'innerPassport',
        isDisabled:  (state, params = {}) => false,
        onClick:     (state, params = {}) => buy(state, 'innerPassport'),
        onTick:      (state, params = {}) => {
            // some code
            state = move(state, {from: 'innerPassport', to: 'innerSecurity'});
            return state;
        },
        name:        'Passport Control',
        cost:        {money: 800},
        bandwidth:   20,
        threshold:   20,
        processing_time: 5,
        description: 'Checks that passengers have valid documents to cross over the country.'
    },

    outPassport: {
        key:         'outPassport',
        isDisabled:  (state, params = {}) => false,
        onClick:     (state, params = {}) => buy(state, 'outPassport'),
        onTick:      (state, params = {}) => {
            // some code
            state = move(state, {from: 'outSecurity', next: 'outPassport'});
            return state;
        },
        name:        'Passport Control',
        cost:        {money: 800},
        bandwidth:   20,
        threshold:   20,
        processing_time: 5,
        description: 'Checks that passengers have valid documents to get into the country.'
    },

    innerSecurity: {
        key:         'innerSecurity',
        isDisabled:  (state, params = {}) => false,
        onClick:     (state, params = {}) => buy(state, 'innerSecurity'),
        onTick:      (state, params = {}) => {
            // to baggage line
            state = move(state, {from: 'innerSecurity', to: 'luggageLine'});
            return state;
        },
        name:        'Security',
        cost:        {money: 800},
        bandwidth:   20,
        threshold:   20,
        processing_time: 5,
        description: 'Provides security check of passengers and their carryon.'
    },

    outSecurity: {
        key:         'outSecurity',
        isDisabled:  (state, params = {}) => false,
        onClick:     (state, params = {}) => buy(state, 'outSecurity'),
        onTick:      (state, params = {}) => {
            // to passport
            state = move(state, {from: 'outSecurity', next: 'outPassport'});
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
            state = move(state, {from: 'checkIn', next: 'outSecurity'});
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
            state = move(state, {from: 'luggageLine', next: 'hall'});
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
            state = move(state, {from: 'runway', to: 'innerBus'});
            return state;
        },
        name:        'Runway',
        cost:        {money: 800},
        bandwidth:   100,
        threshold:   20,
        processing_time: 10,
        description: 'The main airport construction. The more runways you have the more flights you can accept.'
    },

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
