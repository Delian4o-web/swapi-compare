import { createReducer, on } from '@ngrx/store';
import { IPeople } from '../../models/people.interface';
import { PeopleAPIActions, PeoplePageActions } from "./actions";

export const peopleFeatureKey = 'people';

export interface PeopleState {
    actorOneList: IPeople[],
    actorOneDetails: Partial<IPeople>,
    actorTwoList: IPeople[],
    actorTwoDetails: Partial<IPeople>,
    isLoading: boolean,
    characterList: Partial<IPeople[]>
}

export const initialPeopleState: PeopleState = {
    actorOneList: [],
    actorOneDetails: {},
    actorTwoList: [],
    actorTwoDetails: {},
    isLoading: false,
    characterList: []
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
    on(PeoplePageActions.setPeopleData, (state, action) => {
        return {
            ...state,
            isLoading: true,
            characterList: [...state.characterList, action.selectedPeople]
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
