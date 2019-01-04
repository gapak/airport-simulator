
import _ from 'lodash';

const buy = (state, item_key) => {
    console.log('buy', item_key);
    state.constructions[item_key]++;
    return state;
};


export var constructions = {};

constructions = {
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
            state = move(state, {from: 'innerBus', next: 'innerPassport'});
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
            state = move(state, {from: 'innerPassport', next: 'innerSecurity'});
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
            // some code
            state = move(state, {from: 'innerSecurity', next: 'hall'});
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
            // some code
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
            // some code
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
        processing_time: 5,
        description: 'Passengers can have some rest here during a long transfer'
    },

    luggageLine: {
        key:         'luggageLine',
        isDisabled:  (state, params = {}) => false,
        onClick:     (state, params = {}) => buy(state, 'luggageLine'),
        onTick:      (state, params = {}) => {
            // some code
            return state;
        },
        name:        'Luggage Line',
        cost:        {money: 800},
        bandwidth:   20,
        threshold:   20,
        processing_time: 5,
        description: 'Passengers will take their luggage here'
    },

    hall: {
        key:         'hall',
        isDisabled:  (state, params = {}) => false,
        onClick:     (state, params = {}) => buy(state, 'hall'),
        onTick:      (state, params = {}) => {
            // some code
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
            state = move(state, {from: 'runway', next: 'innerBus'});
            return state;
        },
        name:        'Runway',
        cost:        {money: 800},
        bandwidth:   20,
        threshold:   20,
        processing_time: 5,
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
        bandwidth:   20,
        threshold:   20,
        processing_time: 5,
        description: 'Passengers can drink here until they stop worry about their flight'
    },

    rail: {
        key:         'rail',
        isDisabled:  (state, params = {}) => false,
        onClick:     (state, params = {}) => buy(state, 'rail'),
        onTick:      (state, params = {}) => {
            // generate dirty departure passengers, pick clean arrival passengers
            // move dirty departure passengers to hall
            state = move(state, {from: 'rail', next: 'hall'});
            return state;
        },
        name:        'Rail',
        cost:        {money: 800},
        bandwidth:   50,
        threshold:   20,
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
            state = move(state, {from: 'parking', next: 'hall'});
            return state;
        },
        name:        'Parking',
        cost:        {money: 800},
        bandwidth:   20,
        threshold:   20,
        processing_time: 5,
        description: 'People are coming here from a city.'
    },
};

const move = (state, params = {from: '', next: ''}) => {
    //console.log(state);
    //console.log(params);
    //console.log(state.queue[params.from]);
    //console.log(state.processing[params.from]);

    // 1 from processing to next
    let ready = _.remove(state.processing[params.from], passenger => passenger.busy_till < state.tick);

    //console.log(ready.length);
    //console.log(ready);

    if (ready.length > 0) {
        state.queue[params.next] = _.concat(state.queue[params.next], ready);
        //console.log(state.queue[params.next]);
    }

    // 2 params.from queue to processing
    //console.log(state.processing[params.from].length);
    //console.log(constructions[params.from].bandwidth);
    //console.log(state.constructions[params.from]);
    if (state.processing[params.from].length < constructions[params.from].bandwidth * state.constructions[params.from]) {
        if (state.queue[params.from].length > 0) {
            let count = Math.min(constructions[params.from].bandwidth * state.constructions[params.from] - state.processing[params.from].length, state.queue[params.from].length);
            console.log(count);
            console.log(constructions[params.from].bandwidth * state.constructions[params.from] - state.processing[params.from].length, state.queue[params.from].length);
            let to_processing = _.drop(state.queue[params.from], count);
            _.each(to_processing, passenger => { passenger.busy_till = state.tick + constructions[params.from].processing_time });
            state.processing[params.from] = _.concat(state.processing[params.from], to_processing);
            state.queue[params.from] = _.dropRight(state.queue[params.from], (state.queue[params.from].length - count));
        }
    }

    return state;
};