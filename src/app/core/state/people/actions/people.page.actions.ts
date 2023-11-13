import { createAction, props } from '@ngrx/store';
import { IPeople } from '../../../models/people.interface';

export const searchPeopleByNameAction = createAction('[People API] SEARCH_NAME',props<{ name: string,listName:string }>());
export const setPeopleData = createAction('[People API] SET_PEOPLE_DATA',props<{ selectedPeople: IPeople,listName:string }>());

