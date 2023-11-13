import { createAction, props } from '@ngrx/store';
import { IPeople } from '../interfaces/people.interface';

export const searchPeopleByNameAction = createAction('[People API] SEARCH_NAME',props<{ name: string,listName:string }>());
export const setPeopleData = createAction('[People API] SET_PEOPLE_DATA',props<{ selectedPeople: IPeople,listName:string }>());
export const peopleLoadedSuccess = createAction(
    '[People API] People Loaded Successfully',
    props<{ people: IPeople[], listName:string }>()
  );
  
  export const peopleLoadedFailure = createAction(
    '[People API] Failed to Load People',
    props<{ error: Error }>()
  );


  export const individualLoadedSuccess = createAction(
    '[People API] Individual People Loaded Successfully',
    props<{ selectedPeople: IPeople, listName:string }>()
  );


  export const individualLoadedFailure = createAction(
    '[People API] Individual People Loaded Successfully',
    props<{ selectedPeople: IPeople, listName:string }>()
  );