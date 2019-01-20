
import _ from 'lodash';


const default_state = {
    money: 4200,
    workers: 0,

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
        parking: 1,
        runwayBuffer: 1,
        railBuffer: 1,
        parkingBuffer: 1
    },

    workersInConstruction: {
        luggageCart: 0,
        escalator: 1,
        fastRoad: 1,
        dutyFree: 0,
        bus: 1,
        passport: 1,
        security: 1,
        checkIn: 1,
        hotel: 0,
        luggageLine: 0,
        hall: 1,
        runway: 1,
        cafe: 0,
        rail: 1,
        parking: 1,
        runwayBuffer: 0,
        railBuffer: 0,
        parkingBuffer: 0
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
        parking: [],
        runwayBuffer: [],
        railBuffer: [],
        parkingBuffer: []
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
        parking: [],
        runwayBuffer: [],
        railBuffer: [],
        parkingBuffer: []
    },

    vehiclesPassengers: {
        aircraft: [],
        train: [],
        taxi: [],
    },

    game_speed: 2000,
    frame_rate: 1,
    game_speed_multiplier: 1,
    frame: 0,
    tick: 0,
    game_paused: true,
    game_end: false
};


export const getDefaultState = () => _.cloneDeep(default_state);