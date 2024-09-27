import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { reducer as tasksReducer } from './store/tasks/task.reducer';
import { TaskEffects } from './store/tasks/task.effects';

import { routes } from './app.routes';
import { TaskService } from './services/task.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideStore({ tasks: tasksReducer }),
    provideEffects([TaskEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: true }),
    TaskService
  ]
};
