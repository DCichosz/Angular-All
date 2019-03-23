import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('f') formData: NgForm;

  suggestedName = '';
  suggestUserName() {
    this.suggestedName = 'Superuser';
  }

  // onSubmit(formData: NgForm) {
  //   console.log(formData.form.value);
  // }

  onSubmit() {
    if(this.formData.invalid){
      console.log('nope, do not change html disabled property! ');
      return;
    }
    console.log(this.formData);
  }
}
