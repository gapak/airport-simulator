
import _ from 'lodash';


const default_state = {
    money: 4200,

    constructions: {
        luggageCart: 1,
        escalator: 1,
        fastRoad: 1,
        dutyFree: 1,
        bus: 1,
        passport: 1,
        security: 1,
        checkIn: 1,
        hotel: 1,
        luggageLine: 1,
        hall: 1,
        runway: 1,
        cafe: 1,
        rail: 1,
        parking: 1
    },

    queue: {
        luggageCart: [],
        escalator: [],
        fastRoad: [],
        dutyFree: [],
        bus: [],
        passport: [],
        security: [],
        checkIn: [],
        hotel: [],
        luggageLine: [],
        hall: [],
        runway: [],
        cafe: [],
        rail: [],
        parking: []
    },

    processing: {
        luggageCart: [],
        escalator: [],
        fastRoad: [],
        dutyFree: [],
        bus: [],
        passport: [],
        security: [],
        checkIn: [],
        hotel: [],
        luggageLine: [],
        hall: [],
        runway: [],
        cafe: [],
        rail: [],
        parking: []
    },

    vehicles_passengers: {
        aircraft: [],
        train: [],
        taxi: [],
    },

    game_speed: 1000,
    frame_rate: 1,
    game_speed_multiplier: 1,
    frame: 0,
    tick: 0,
    game_paused: true,
    game_end: false
};


export const getDefaultState = () => _.cloneDeep(default_state);