import { createFeatureSelector, createSelector } from '@ngrx/store';
import { peopleFeatureKey } from "./people.reducer";
import { IPeople } from "../../models/people.interface";

const fetchPeopleState = createFeatureSelector<any>(peopleFeatureKey);

export const selectFirstCharacterList = createSelector(
    fetchPeopleState, (state) => state.actorOneList
);

export const selectIsLoading = createSelector(
    fetchPeopleState,
    (state) => state.isLoading
);

export const selectSecondCharacterList = createSelector(fetchPeopleState, (state) => {
    return state.actorTwoList;
});

export const selectFirstCharacter = createSelector(fetchPeopleState, (state) => {
    return state.actorOneDetails;
});

export const selectSecondCharacter = createSelector(fetchPeopleState, (state) => {
    return state.actorTwoDetails;
});

export const isWinner = (props: { name: string, characterName: string | undefined }) =>
    createSelector(
        fetchPeopleState,
        (state) => {
            const opponentOne = state.characterList.find((c: IPeople) => c.name === props.characterName) as IPeople | undefined;
            const opponentTwo = state.characterList.find((c: IPeople) => c.name !== props.characterName) as IPeople | undefined;

            if (opponentOne && opponentTwo && opponentOne[props.name as keyof IPeople] !== undefined && opponentTwo[props.name as keyof IPeople] !== undefined) {
                return parseInt(opponentOne[props.name as keyof IPeople]) > parseInt(opponentTwo[props.name as keyof IPeople]);
            }

            return false;
        },
    );




