
import _ from 'lodash';


const default_state = {
    money: 4200,

    constructions: {
        innerLuggageCart: 1,
        outLuggageCart: 1,
        innerEscalator: 1,
        outEscalator: 1,
        innerFastRoad: 1,
        outFastRoad: 1,
        dutyFree: 1,
        innerBus: 1,
        outBus: 1,
        innerPassport: 1,
        outPassport: 1,
        innerSecurity: 1,
        outSecurity: 1,
        checkIn: 1,
        hotel: 1,
        hall: 1,
        runway: 1,
        cafe: 1,
        rail: 1,
        parking: 1
    },

    vehicles_passengers: {
        aircraft: [],
        train: [],
        taxi: [],
    },

    passengers: {
        innerLuggageCart: [],
        outLuggageCart: [],
        innerEscalator: [],
        outEscalator: [],
        innerFastRoad: [],
        outFastRoad: [],
        dutyFree: [],
        innerBus: [],
        outBus: [],
        innerPassport: [],
        outPassport: [],
        innerSecurity: [],
        outSecurity: [],
        checkIn: [],
        hotel: [],
        hall: [],
        runway: [],
        cafe: [],
        rail: [],
        parking: []
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