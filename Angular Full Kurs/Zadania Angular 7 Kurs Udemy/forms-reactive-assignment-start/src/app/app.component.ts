import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from './custom-validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  projectForm: FormGroup;

  ngOnInit() {
    this.projectForm = new FormGroup({
      'projectName': new FormControl(null, [Validators.required, CustomValidators.invalidProjectName, CustomValidators.asyncInvalidProjectName]),
      'email': new FormControl(null, [Validators.email, Validators.required]),
      'projectStatus': new FormControl('critical')
    });
  }

  onSubmit(): void {
    console.log(this.projectForm.value);
  }
}
