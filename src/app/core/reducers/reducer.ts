import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { peopleReducer} from "../state/people/people.reducer";
import {peopleFeatureKey} from "../state/people/people.reducer";
import { IPeople } from '../models/people.interface';

export interface AppState {
    [peopleFeatureKey]: {
        actorOneList:IPeople[],
        actorOneDetails:Partial<IPeople>,
        actorTwoList:IPeople[],
        actorTwoDetails:Partial<IPeople>,
      };
    router: RouterReducerState;
}

export const appReducer = {
    [peopleFeatureKey]: peopleReducer,
    router: routerReducer,
};
