
import _ from 'lodash';


const default_state = {
    game_speed: 1000,
    frame_rate: 1,
    game_speed_multiplier: 1,
    frame: 0,
    tick: 0,
    game_paused: true,
    game_end: false
};


export const getDefaultState = () => _.cloneDeep(default_state);