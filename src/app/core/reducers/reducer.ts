import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { peopleReducer} from "../people/reducers/people.reducer";
import {peopleFeatureKey} from "../people/reducers/people.reducer";
import { spinnerFeatureKey, spinnerReducer } from '../spinner/reducers/spinner.reducer';
import { IPeople } from '../people/interfaces/people.interface';

export interface AppState {
    [peopleFeatureKey]: {
        actorOneList:IPeople[],
        actorOneDetails:Partial<IPeople>,
        actorTwoList:IPeople[],
        actorTwoDetails:Partial<IPeople>,
      };
      [spinnerFeatureKey]: boolean,
    router: RouterReducerState;
}

export const appReducer = {
    [peopleFeatureKey]: peopleReducer,
    [spinnerFeatureKey]: spinnerReducer,
    router: routerReducer,
};
