import { createFeatureSelector, createSelector } from '@ngrx/store';
import { peopleFeatureKey } from "./people.reducer";

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

export const isWinner = (props: { name: string, type: string }) =>
    createSelector(
        fetchPeopleState,
        (state) => {
            const opponentType = props.type === 'One' ? 'Two' : 'One';
            const opponentOne = state[`actor${props.type}Details`][props.name];
            const opponentTwo = state[`actor${opponentType}Details`][props.name];

            return !!opponentOne && !!opponentTwo && opponentOne > opponentTwo;
        },
    );



