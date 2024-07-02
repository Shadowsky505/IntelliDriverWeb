import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { NavbarLoggedComponent } from './navbar-logged/navbar-logged.component';
import { IndexDashboardComponent } from './index-dashboard/index-dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { MarkdownModule } from 'ngx-markdown';

export function jwtOptionsFactory() {
  return {
    tokenGetter: () => {
      return localStorage.getItem('auth_token'); // Aquí debes devolver el token JWT desde el almacenamiento local
    }
  };
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    DashboardComponent,
    InicioComponent,
    NavbarLoggedComponent,
    IndexDashboardComponent,
    SidebarComponent,
    ChatbotComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    MarkdownModule,
    HttpClientModule,
    AppRoutingModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory
      }
    }),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
