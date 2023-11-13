import { createReducer, on } from '@ngrx/store';
import { IPeople } from '../../models/people.interface';
import { PeopleAPIActions, PeoplePageActions } from "./actions";

export const peopleFeatureKey = 'people';

export interface PeopleState {
    actorOneList: IPeople[],
    actorOneDetails: Partial<IPeople>,
    actorTwoList: IPeople[],
    actorTwoDetails: Partial<IPeople>,
    isLoading: boolean
}

export const initialPeopleState: PeopleState = {
    actorOneList: [],
    actorOneDetails: {},
    actorTwoList: [],
    actorTwoDetails: {},
    isLoading: false,
};

export const peopleReducer = createReducer(
    initialPeopleState,
    on(PeoplePageActions.searchPeopleByNameAction, (state) => {
        return {
            ...state,
            isLoading: true
        }
    }),
    on(PeopleAPIActions.peopleLoadedSuccess, (state, {people, listName}) => {
        return {
            ...state,
            [listName]: people,
            isLoading: false
        }
    }),
    on(PeoplePageActions.setPeopleData, (state) => {
        return {
            ...state,
            isLoading: true
        }
    }),
    on(PeopleAPIActions.individualLoadedSuccess, (state, {selectedPeople, listName}) => {
        return {
            ...state,
            [listName]: selectedPeople,
            isLoading: false
        }
    }),
);
