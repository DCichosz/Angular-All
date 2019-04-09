import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppComponent } from './app.component';
import { BooksComponent } from './books/books.component';
import { UsersComponent } from './users/users.component';
import { LendComponent } from './lend/lend.component';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    UsersComponent,
    LendComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AngularFontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
