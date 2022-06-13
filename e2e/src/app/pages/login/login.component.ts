import { Component, OnInit } from '@angular/core';
// ANGULAR FORM
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormValidationService } from 'app/services/form/form-validation.service';
import { SnackMessageService } from 'app/services/notifcation/snack-message.service';
import { TestService } from 'app/services/test.service';
import { Router } from '@angular/router';
// SERVICES

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  showPassword: any = false;
  // INIT LOGIN FORM DIRECTLY
  loginForm: FormGroup = this.formBuilder.group({
    email: [
      '',
      Validators.compose([
        Validators.required,
        Validators.email,
        Validators.minLength(5),
        Validators.maxLength(30),
      ]),
    ],
    password: [
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16),
        Validators.pattern(
          '(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
        ),
      ]),
    ],
  });

  constructor(
    private formBuilder: FormBuilder,
    private formValidationService: FormValidationService,
    private notification: SnackMessageService,
    private testService: TestService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  fieldHasError(fieldName: string) {
    return this.formValidationService.fieldHasError(fieldName, this.loginForm);
  }

  getErrorMessage(fieldName: string) {
    return this.formValidationService.getErrorMessage(
      fieldName,
      this.loginForm
    );
  }

    onLoginSubmit() {
        if (this.loginForm.valid) {
        // this.authService.login(this.loginForm.value);
            this.notification.show({
                message: 'SuccessFull Register !',
                class: 'success'
            });

        } else {
            this.notification.show({
                message: 'Fill All Required Fields !',
                class: 'danger'
            });
        }
        const username = btoa('salaheddine');
        this.testService.setCookie('uid', username, 30);
        this.router.navigate(['/dashboard']);
    }

    myFunction = () =>  {
        const i = !this.showPassword;
        this.showPassword = i;
    }

}
