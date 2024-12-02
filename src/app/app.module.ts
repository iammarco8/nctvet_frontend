import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './partials/header/header.component';
import { FooterComponent } from './partials/footer/footer.component';
import { HomeComponent } from './partials/body/home/home.component';
import { LoginComponent } from './partials/body/login/login.component';
import { TaskCreateComponent } from './partials/body/userControl/task-create/task-create.component';
import { TaskViewComponent } from './partials/body/userControl/task-view/task-view.component';
import { TaskEditComponent } from './partials/body/userControl/task-edit/task-edit.component';
import { NotfoundComponent } from './partials/body/notfound/notfound.component';
import { LogoutComponent } from './partials/body/logout/logout.component';
import { UserViewComponent } from './partials/body/userControl/user-view/user-view.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { EmailComponent } from './emailTemplate/email/email.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    TaskCreateComponent,
    TaskViewComponent,
    TaskEditComponent,
    NotfoundComponent,
    LogoutComponent,
    UserViewComponent,
    EmailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
