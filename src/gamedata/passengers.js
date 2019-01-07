
import _ from 'lodash';

import { constructions } from "./constructions";

export const move = (state, direction = {from: '', to: ''}, predicate = passenger => true) => {
    let processedPassengers = _.remove(
        state.processing[direction.from],
        passenger => passenger.busy_till < state.tick && predicate(passenger)
    );

    // If passengers are already processed
    // they are going to queue to the to construction
    if (processedPassengers.length > 0) {
        state.queue[direction.to] = _.concat(state.queue[direction.to], processedPassengers);
    }

    // number of the construction multiplied on the construction bandwidth
    let totalBandwidth = constructions[direction.from].bandwidth * state.constructions[direction.from];
    // passengers that now in the construction
    let numberOfProcessingPassengers = state.processing[direction.from].length;
    // passengers that are waiting for getting into the to construction
    let numberOfPassengersInQueue = state.queue[direction.from].length;

    if (numberOfProcessingPassengers < totalBandwidth) {
        if (numberOfPassengersInQueue > 0) {
            let vacantPlaces = totalBandwidth - numberOfProcessingPassengers;

            // If there are more vacant places than passengers in the queue
            // Then move all the queue
            let numberOfPassengersToMove = Math.min(vacantPlaces, numberOfPassengersInQueue);

            let passengersToProcessing = _.take(state.queue[direction.from], numberOfPassengersToMove);

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
                passenger.busy_till = state.tick + constructions[direction.from].processing_time
            });

            // Add passengers to processing
            state.processing[direction.from] = _.concat(state.processing[direction.from], passengersToProcessing);
            // Remove passengers from the queue
            state.queue[direction.from] = _.drop(
                state.queue[direction.from],
                numberOfPassengersToMove
            );
        }
    }

    return state;
};