
import _ from 'lodash';

const buy = (state, item_key) => {
    console.log('buy', item_key);
    state.constructions[item_key]++;
    return state;
};

const move = (state, direction = {from: '', to: ''}) => {
    let processedPassengers = _.remove(
        state.processing[direction.from],
        passenger => passenger.busy_till < state.tick
    );

    // If passengers are already processed
    // they are going to queue to the next construction
    if (processedPassengers.length > 0) {
        state.queue[direction.to] = _.concat(state.queue[direction.to], processedPassengers);
    }

    // number of the construction multiplied on the construction bandwidth
    let totalBandwidth = constructions[direction.from].bandwidth * state.constructions[direction.from];
    // passengers that now in the construction
    let numberOfProcessingPassengers = state.processing[direction.from].length;
    // passengers that are waiting for getting into the next construction
    let numberOfPassengersInQueue = state.queue[direction.from].length;
    
    if (numberOfProcessingPassengers < totalBandwidth) {
        if (numberOfPassengersInQueue > 0) {
            let vacantPlaces = totalBandwidth - numberOfProcessingPassengers;

            // If there are more vacant places than passengers in the queue
            // Then move all the queue
            let numberOfPassengersToMove = Math.min(vacantPlaces, numberOfPassengersInQueue);
            let passengersToProcessing = _.drop(state.queue[direction.from], numberOfPassengersToMove);

            // Every passenger gets a time-marker: till when they will be processing
            // from now + @processing_time of the construction
            _.each(passengersToProcessing, passenger => {
                passenger.busy_till = state.tick + constructions[direction.from].processing_time
            });

            // Add passengers to processing
            state.processing[direction.from] = _.concat(state.processing[direction.from], passengersToProcessing);
            // Remove passengers from the queue
            state.queue[direction.from] = _.dropRight(
                state.queue[direction.from],
                (numberOfPassengersInQueue - numberOfPassengersToMove)
            );
        }
    }

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
            state = move(state, {from: 'innerSecurity', to: 'hall'});
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
            state = move(state, {from: 'runway', to: 'innerBus'});
            return state;
        },
        name:        'Runway',
        cost:        {money: 800},
        bandwidth:   200,
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
            state = move(state, {from: 'rail', to: 'hall'});
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
            state = move(state, {from: 'parking', to: 'hall'});
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
