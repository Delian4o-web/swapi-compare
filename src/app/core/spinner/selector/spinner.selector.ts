import { createFeatureSelector, createSelector } from '@ngrx/store';
import {spinnerFeatureKey} from "../reducers/spinner.reducer";

const fetchSidebarState = createFeatureSelector<boolean>(spinnerFeatureKey);

export const isOpened = createSelector(fetchSidebarState, (state) => {
  return state;
});
