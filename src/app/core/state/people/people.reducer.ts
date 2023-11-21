import { createReducer, on } from '@ngrx/store';
import { IPeople } from '../../models/people.interface';
import { PeopleAPIActions, PeoplePageActions } from "./actions";
import { searchCharacterByNameFailure, searchCharacterByNameSuccess } from "./actions/people.api.actions";
import { ICharacter } from "../../models/character.interface";

export const peopleFeatureKey = 'people';

export interface PeopleState {
    actorOneList: IPeople[],
    actorOneDetails: Partial<IPeople>,
    actorTwoList: IPeople[],
    actorTwoDetails: Partial<IPeople>,
    isLoading: boolean,
    characterList: ICharacter[]
}

export const initialPeopleState: PeopleState = {
    actorOneList: [],
    actorOneDetails: {},
    actorTwoList: [],
    actorTwoDetails: {},
    isLoading: false,
    characterList: [],
};

export const peopleReducer = createReducer(
    initialPeopleState,
    on(PeoplePageActions.searchCharacterByName, (state) => {
        return {
            ...state,
            isLoading: true
        }
    }),
    on(PeopleAPIActions.searchCharacterByNameSuccess, (state, {characters, listName}) => {
        return {
            ...state,
            [listName]: characters,
            isLoading: false
        }
    }),
    on(PeoplePageActions.loadCharacterDetails, (state, {character}) => {
        return {
            ...state,
            isLoading: true,
        }
    }),
    on(PeopleAPIActions.loadCharacterDetailsSuccess, (state, action) => {
        const character: ICharacter = {
            characterId: action.characterDetails.name,
            characterDetails: action.characterDetails
        }

        return {
            ...state,
            [action.listName]: action.characterDetails,
            characterList: [...state.characterList, character],
            isLoading: false
        }
    }),
    on(PeopleAPIActions.searchCharacterByNameFailure, (state, {characters, listName}) => {
        return {
            ...state,
            [listName]: characters,
            isLoading: false
        }
    }),
    on(PeopleAPIActions.loadCharacterDetailsFailure, (state, action) => {
        return {
            ...state,
            [action.listName]: action.characterDetails,
            isLoading: false
        }
    }),
);
