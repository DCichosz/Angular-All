import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('f') formData: NgForm;

  answer = '';
  defaultQuestion = 'pet';
  genders = ['male', 'female'];
user = {
  username: '',
  email: '',
  secretQuestion: '',
  secretAnswer: '',
  gender: ''
};
submitted = false;

  suggestUserName() {
    const suggestedName = 'Superuser';
    // setValue do ustawienia calego formularza
    // this.formData.setValue({
    //   userData: {
    //     username: suggestedName,
    //     email: ''
    //   },
    //   secret: 'pet',
    //   questionAnswer: '',
    //   gender: 'male'
    // });

    // patch value do ustawienia tylko niektorych prop
    this.formData.form.patchValue({
      userData: {
        username: suggestedName
      }
    });
  }

  // onSubmit(formData: NgForm) {
  //   console.log(formData.form.value);
  // }

  onSubmit() {
    if (this.formData.invalid) {
      console.log('nope, do not change html disabled property! ');
      return;
    }
    console.log(this.formData);
    this.user.username = this.formData.value.userData.username;
    this.user.email = this.formData.value.userData.email;
    this.user.secretQuestion = this.formData.value.secret;
    this.user.secretAnswer = this.formData.value.questionAnswer;
    this.user.gender = this.formData.value.gender;
    this.submitted = true;

    // resetuje formularz
    this.formData.reset();
  }
}
