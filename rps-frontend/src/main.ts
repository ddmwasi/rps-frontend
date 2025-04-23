import {enableProdMode} from "@angular/core";
import {bootstrapApplication} from '@angular/platform-browser';
import {appConfig} from './app/app.config';
import {AppComponent} from './app/app.component';
import {env} from './environments/environment.prod';


if (env.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error());
