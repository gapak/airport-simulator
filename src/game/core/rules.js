
import _ from 'lodash';
import { constructions } from '../../gamedata/constructions.js';

import { vehicles } from '../../gamedata/vehicles';
import { constructions } from '../../gamedata/constructions';

export const rules = {
    matrix_show: { onFrame: (store, params = {}) => {
        store.matrix_show =
            Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15);
        return store;
    }},

    pause_on_game_end: {onFrame: (store, params) => {
        if (store.game_end) params.gin.pauseGame();
        return store;
    }},

    vehicles: {
            onFrame: (store, params = {}) => {
                _.each(vehicles, vehicle => {
                    if (vehicle.onFrame)
                        store = vehicle.onFrame(store, params);
                });
                return store;
            },
            onTick: (store, params = {}) => {
                _.each(vehicles, vehicle => {
                    if (vehicle.onTick)
                        store = vehicle.onTick(store, params);
                });
                return store;
            }
     },

    constructions: {
            onFrame: (store, params = {}) => {
                _.each(constructions, construction => {
                    if (construction.onFrame)
                        store = construction.onFrame(store, params);
                });
                return store;
            },
            onTick: (store, params = {}) => {
                _.each(constructions, construction => {
                    if (construction.onTick)
                        store = construction.onTick(store, params);
                });
                return store;
            }
    },
};


/**
 generate_passengers: { onTick: (store) => {
        const runway = constructions.runway;
        runway.passengers += _.random(100, runway.bandwidth);
        return store;
    }}
*/
