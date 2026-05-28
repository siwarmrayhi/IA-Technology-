import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { ModerateurActualitesComponent } from './features/moderateur/actualites/moderateur-actualites/moderateur-actualites.component';
import { ModerateurAnnoncesComponent } from './features/moderateur/annonces/moderateur-annonces/moderateur-annonces.component';
import { ModerateurProjetsComponent } from './features/moderateur/projets/moderateur-projets/moderateur-projets.component';


@NgModule({
  declarations: [
    AppComponent,



  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
        ModerateurActualitesComponent,
    ModerateurAnnoncesComponent,
        ModerateurProjetsComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
