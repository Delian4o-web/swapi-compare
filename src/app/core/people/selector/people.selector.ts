import { createFeatureSelector, createSelector } from '@ngrx/store';
import { peopleFeatureKey } from "../reducers/people.reducer";

const fetchPeopleState = createFeatureSelector<any>(peopleFeatureKey);

export const getSearchPeopleResultFirst = createSelector(fetchPeopleState, (state) => {
  return state.actorOneList;
});

export const getSearchPeopleResultSecond = createSelector(fetchPeopleState, (state) => {
  return state.actorTwoList;
});

export const getSelectedPeopleA = createSelector(fetchPeopleState, (state) => {
  return state.actorOneDetails;
});

export const getSelectedPeopleB = createSelector(fetchPeopleState, (state) => {
  return state.actorTwoDetails;
});

export const getState = createSelector(fetchPeopleState, (state) => {
  return state;
});

export const isWinner = (props: { name: string, type: string }) =>
  createSelector(
    fetchPeopleState,
    (state) => {
      const opponentType = props.type === 'One' ? 'Two' : 'One';
      if (!state[`actor${props.type}Details`][props.name] || !state[`actor${opponentType}Details`][props.name]) {
        return false;
      }
      else   if (state[`actor${props.type}Details`][props.name] as unknown as number > state[`actor${opponentType}Details`][props.name] as unknown as number) {
        return true;
      }
      return false;
    },
  );