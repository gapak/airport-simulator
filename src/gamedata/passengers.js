
import _ from 'lodash';

import { constructions } from "./constructions";

export const move = (state, params = {from: '', to: '', predicate: passenger => true, modifier: passenger => passenger}) => {
    params = _.assign({from: '', to: '', predicate: passenger => true, modifier: passenger => passenger}, params);

    let processedPassengers = _.remove(
        state.processing[params.from],
        passenger => passenger.busy_till < state.tick && params.predicate(passenger)
    );

    // If passengers are already processed
    // they are going to queue to the to construction
    if (processedPassengers.length > 0) {
        state.queue[params.to] = _.concat(state.queue[params.to], processedPassengers);
    }

    // number of the construction multiplied on the construction bandwidth
    let totalBandwidth = constructions[params.from].bandwidth * state.constructions[params.from];
    // passengers that now in the construction
    let numberOfProcessingPassengers = state.processing[params.from].length;
    // passengers that are waiting for getting into the to construction
    let numberOfPassengersInQueue = state.queue[params.from].length;

    if (numberOfProcessingPassengers < totalBandwidth) {
        if (numberOfPassengersInQueue > 0) {
            let vacantPlaces = totalBandwidth - numberOfProcessingPassengers;

            // If there are more vacant places than passengers in the queue
            // Then move all the queue
            let numberOfPassengersToMove = Math.min(vacantPlaces, numberOfPassengersInQueue);

            let passengersToProcessing = _.take(state.queue[params.from], numberOfPassengersToMove);

            if (numberOfPassengersToMove !== passengersToProcessing.length) {
                console.log(
                    "Wrong count: count !== to_processing.length ",
                    numberOfPassengersToMove,
                    passengersToProcessing.length
                );
            }

            // Every passenger gets a time-marker: till when they will be processing
            // from now + @processing_time of the construction
            _.each(passengersToProcessing, passenger => {
                passenger.busy_till = state.tick + constructions[params.from].processing_time
                passenger = params.modifier(passenger);
            });

            // Add passengers to processing
            state.processing[params.from] = _.concat(state.processing[params.from], passengersToProcessing);
            // Remove passengers from the queue
            state.queue[params.from] = _.drop(
                state.queue[params.from],
                numberOfPassengersToMove
            );
        }
    }

    return state;
};