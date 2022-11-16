import { AuthService } from './../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  submitted: boolean = false;
  loading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  get f() {return this.signupForm.controls;}

  onSubmit() {
    this.submitted = true;
    if(this.signupForm.invalid) {
      return;
    }
    this.loading = true;
    this.authService.register(this.signupForm.value)
    .pipe(first())
    .subscribe(
      data => {
        this.router.navigate(['/auth/login']);
      },
      err => {
        this.loading = false;
      }
    )
  }

}
