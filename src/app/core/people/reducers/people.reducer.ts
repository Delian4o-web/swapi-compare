import { createReducer, on } from '@ngrx/store';
import {peopleLoadedSuccess, individualLoadedSuccess} from "../actions/people.actions";
import { IPeople } from '../interfaces/people.interface';
export const peopleFeatureKey = 'people';

export const initialPeopleState:{
  actorOneList:IPeople[],
  actorOneDetails:Partial<IPeople>,
  actorTwoList:IPeople[],
  actorTwoDetails:Partial<IPeople>,
} = {
  actorOneList:[],
  actorOneDetails : {},
  actorTwoList:[],
  actorTwoDetails : {}
};

export const peopleReducer = createReducer(
  initialPeopleState,
  on(peopleLoadedSuccess, (state,{people,listName}) => ({...state,[listName]:people})),
  on(individualLoadedSuccess, (state,{selectedPeople,listName}) => ({...state,[listName]:selectedPeople})),
);
