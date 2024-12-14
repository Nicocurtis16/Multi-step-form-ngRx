import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormDataService } from '../../../shared/form-data.service';

@Component({
  selector: 'app-your-info',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './your-info.component.html',
  styleUrls: ['./your-info.component.css']
})
export class YourInfoComponent implements OnInit {
  yourInfoForm: FormGroup;

  constructor(private fb: FormBuilder, private formDataService: FormDataService) {
    this.yourInfoForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    });
  }

  ngOnInit() {
    this.yourInfoForm.valueChanges.subscribe(value => {
      this.formDataService.setFormData('yourInfo', value);
      console.log('Form data updated:', value); // Debug log
    });

    const savedData = this.formDataService.getFormData('yourInfo');
    if (savedData) {
      this.yourInfoForm.patchValue(savedData);
    }
  }

  get name() { return this.yourInfoForm.get('name')!; }
  get email() { return this.yourInfoForm.get('email')!; }
  get phone() { return this.yourInfoForm.get('phone')!; }

  saveData() {
    if (this.yourInfoForm.valid) {
      const formData = this.yourInfoForm.value;
      console.log('Form data to save:', formData); // Log form data
      return { isValid: true, data: formData };
    } else {
      console.error('Form is invalid:', this.yourInfoForm.errors); // Log validation errors
      return { isValid: false, errors: this.yourInfoForm.errors };
    }
  }

  populateForm(data: any) {
    this.yourInfoForm.patchValue(data);
  }

  private getFormErrors() {
    const errors: { [key: string]: string[] } = {};
    Object.keys(this.yourInfoForm.controls).forEach(key => {
      const controlErrors = this.yourInfoForm.get(key)?.errors;
      if (controlErrors) {
        errors[key] = Object.keys(controlErrors);
      }
    });
    return errors;
  }
}
