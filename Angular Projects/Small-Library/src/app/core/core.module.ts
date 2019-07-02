import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [HeaderComponent, NewsletterComponent],
  exports: [BrowserModule, HeaderComponent, NewsletterComponent],
  imports: [BrowserModule]
})
export class CoreModule {}
