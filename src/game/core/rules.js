
import _ from 'lodash';

export const rules = {
    matrix_show: { onFrame: (store, params = {}) => { store.matrix_show = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15); return store; }},

    pause_on_game_end: {onFrame: (store, params) => {
        if (store.game_end) params.gin.pauseGame(); return store; }},

};