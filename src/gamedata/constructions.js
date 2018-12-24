


const buy = (state, item_key) => {
    console.log('buy', item_key);
    state.constructions[item_key]++;
    return state;
};


export const constructions = {
    innerLuggageCart: {
        key: 'innerLuggageCart',
        isDisabled: (state, params = {}) => false,
        onClick: (state, params = {}) => buy(state, 'innerLuggageCart'),
        name: 'Luggage Cart',
        cost: {money: 1620},
        bandwidth: 20,
        description: 'These cars drive luggage from the airport to a plane.'
    },

    outLuggageCart: {
        key: 'outLuggageCart',
        isDisabled: (state, params = {}) => false,
        onClick: (state, params = {}) => buy(state, 'outLuggageCart'),
        name: 'Luggage Cart',
        cost: {money: 1620},
        bandwidth: 20,
        description: 'These cars drive luggage from a plane to the airport.'
    },

    innerEscalator: {
        key: 'innerEscalator',
        isDisabled: (state, params = {}) => state.innerEscalator < 5,
        onClick: (state, params = {}) => buy(state, 'innerEscalator'),
        name: 'Escalator',
        cost: {money: 800},
        bandwidth: 20,
        description: 'Transports people between floors.'
    },

    outEscalator: {
        key: 'outEscalator',
        isDisabled: (state, params = {}) => false,
        onClick: (state, params = {}) => buy(state, 'outEscalator'),
        name: 'Escalator',
        cost: {money: 800},
        bandwidth: 20,
        description: 'Transports people between floors.'
    },

    innerFastRoad: {
        key: 'innerFastRoad',
        isDisabled: (state, params = {}) => false,
        onClick: (state, params = {}) => buy(state, 'innerFastRoad'),
        name: 'Fast Road',
        cost: {money: 800},
        bandwidth: 20,
        description: 'Allows people to move faster between gates.'
    },

    outFastRoad: {
        key: 'outFastRoad',
        isDisabled: (state, params = {}) => false,
        onClick: (state, params = {}) => buy(state, 'outFastRoad'),
        name: 'Fast Road',
        cost: {money: 800},
        bandwidth: 20,
        description: 'Allows people to move faster between gates.'
    },


    dutyFree: {
        key: 'dutyFree',
        isDisabled: (state, params = {}) => false,
        onClick: (state, params = {}) => buy(state, 'dutyFree'),
        name: 'Duty Free',
        cost: {money: 3000},
        bandwidth: 50,
        description: 'Passengers can buy some gifts here while their flight is late.'
    },

    innerBus: {
        key: 'innerBus',
        isDisabled: (state, params = {}) => false,
        onClick: (state, params = {}) => buy(state, 'innerBus'),
        name: 'Bus',
        cost: {money: 800},
        bandwidth: 20,
        description: 'Transports people from airport to a plane.'
    },

    outBus: {
        key: 'outBus',
        isDisabled: (state, params = {}) => false,
        onClick: (state, params = {}) => buy(state, 'outBus'),
        name: 'Bus',
        cost: {money: 800},
        bandwidth: 20,
        description: 'Transports people from plane to the airport.'
    },

    innerPassport: {
        key: 'innerPassport',
        isDisabled: (state, params = {}) => false,
        onClick: (state, params = {}) => buy(state, 'innerPassport'),
        name: 'Passport Control',
        cost: {money: 800},
        bandwidth: 20,
        description: 'Checks that passengers have valid documents to cross over the country.'
    },

    outPassport: {
        key: 'outPassport',
        isDisabled: (state, params = {}) => false,
        onClick: (state, params = {}) => buy(state, 'outPassport'),
        name: 'Passport Control',
        cost: {money: 800},
        bandwidth: 20,
        description: 'Checks that passengers have valid documents to get into the country.'
    },

    innerSecurity: {
        key: 'innerSecurity',
        isDisabled: (state, params = {}) => false,
        onClick: (state, params = {}) => buy(state, 'innerSecurity'),
        name: 'Security',
        cost: {money: 800},
        bandwidth: 20,
        description: 'Provides security check of passengers and their carryon.'
    },

    outSecurity: {
        key: 'outSecurity',
        isDisabled: (state, params = {}) => false,
        onClick: (state, params = {}) => buy(state, 'outSecurity'),
        name: 'Security',
        cost: {money: 800},
        bandwidth: 20,
        description: 'Provides security check of passengers and their carryon.'
    },

    checkIn: {
        key: 'checkIn',
        isDisabled: (state, params = {}) => false,
        onClick: (state, params = {}) => buy(state, 'checkIn'),
        name: 'Check-in',
        cost: {money: 800},
        bandwidth: 20,
        description: 'Allow passengers to register on a flight offline.'
    },

    hotel: {
        key: 'hotel',
        isDisabled: (state, params = {}) => false,
        onClick: (state, params = {}) => buy(state, 'hotel'),
        name: 'Hotel',
        cost: {money: 800},
        bandwidth: 20,
        description: 'Passengers can have some rest here during a long transfer'
    },

    hall: {
        key: 'hall',
        isDisabled: (state, params = {}) => false,
        onClick: (state, params = {}) => buy(state, 'hall'),
        name: 'Hall',
        cost: {money: 800},
        bandwidth: 20,
        description: 'Common place for passengers to wait for their flight. Make sure it has enough benches.'
    },

    runway: {
        key: 'runway',
        isDisabled: (state, params = {}) => false,
        onClick: (state, params = {}) => buy(state, 'runway'),
        name: 'Runway',
        cost: {money: 800},
        bandwidth: 20,
        description: 'The main airport construction. The more runways you have the more flights you can accept.'
    },

    cafe: {
        key: 'cafe',
        isDisabled: (state, params = {}) => false,
        onClick: (state, params = {}) => buy(state, 'cafe'),
        name: 'Cafe',
        cost: {money: 800},
        bandwidth: 20,
        description: 'Passengers can drink here until they stop worry about their flight'
    },

    rail: {
        key: 'rail',
        isDisabled: (state, params = {}) => false,
        onClick: (state, params = {}) => buy(state, 'rail'),
        name: 'Rail',
        cost: {money: 800},
        bandwidth: 20,
        description: 'This rail transports passengers from a city to the airport.'
    },

    parking: {
        key: 'parking',
        isDisabled: (state, params = {}) => false,
        onClick: (state, params = {}) => buy(state, 'parking'),
        name: 'Parking',
        cost: {money: 800},
        bandwidth: 20,
        description: 'People are coming here from a city.'
    }
};