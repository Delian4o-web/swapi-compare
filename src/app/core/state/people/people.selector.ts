import { createFeatureSelector, createSelector } from '@ngrx/store';
import { peopleFeatureKey } from "./people.reducer";
import { IPeople } from "../../models/people.interface";
import { ICharacter } from "../../models/character.interface";

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

export const isWinner = (props: { propertyName: string, characterName: string | undefined }) =>
    createSelector(
        fetchPeopleState,
        (state) => {
            const opponentOne = state.characterList.find((c: ICharacter) => c.characterId === props.characterName) as ICharacter | undefined;
            const opponentTwo = state.characterList.find((c: ICharacter) => c.characterId !== props.characterName) as ICharacter | undefined;

            if (opponentOne && opponentTwo && opponentOne.characterDetails[props.propertyName as keyof IPeople] !== undefined && opponentTwo.characterDetails[props.propertyName as keyof IPeople] !== undefined) {
                return parseInt(opponentOne.characterDetails[props.propertyName as keyof IPeople]) > parseInt(opponentTwo.characterDetails[props.propertyName as keyof IPeople]);
            }

            return false;
        },
    );




