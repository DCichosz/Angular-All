import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import { NewsletterComponent } from './newsletter/newsletter.component';

@NgModule({
  declarations: [HeaderComponent, NewsletterComponent],
  exports: [HeaderComponent, NewsletterComponent]
})
export class CoreModule {}
