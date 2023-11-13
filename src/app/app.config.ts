import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { appReducer } from './core/reducers/reducer';
import { provideStore } from '@ngrx/store';
import { provideRouterStore } from '@ngrx/router-store';
import {provideStoreDevtools} from "@ngrx/store-devtools";
import { provideEffects } from '@ngrx/effects';
import { PeopleEffects } from './core/people/effects/people.effects';
import { PeopleService } from './core/people/service/people.service';
import { HttpClientModule } from '@angular/common/http';


export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(HttpClientModule),
    {provide: PeopleService, useClass: PeopleService},
    provideStore(appReducer),
    provideRouterStore(),
    provideStoreDevtools(),
    provideEffects([PeopleEffects]),
    provideRouter(routes), provideAnimations()]
};
