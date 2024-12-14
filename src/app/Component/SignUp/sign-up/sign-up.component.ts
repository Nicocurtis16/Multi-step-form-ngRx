import { AfterViewInit, Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FormDataService } from '../../../shared/form-data.service';
import { StatusPanelComponent } from '../status-panel/status-panel.component';
import { SummaryComponent } from '../../Steps/summary/summary.component';
import {NgIf, NgStyle} from '@angular/common';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  standalone: true,
  imports: [
    StatusPanelComponent,
    RouterOutlet,
    SummaryComponent,
    NgIf,
    NgStyle
  ],
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements AfterViewInit {
  activeStep = 1;
  formData: any = {};
  showConfirmation: boolean = false;

  constructor(private router: Router, private formDataService: FormDataService) {}

  ngAfterViewInit() {
    this.loadStepData();
  }

  loadStepData() {
    const savedData = this.formDataService.getAllFormData();
    console.log('Loaded form data:', savedData); // Debug log
    if (savedData) {
      this.formData = savedData;
    }
  }

  nextStep() {
    if (this.activeStep < 4) {
      const formData = this.saveStepData();
      if (!formData.isValid) {
        console.log('Form is invalid:', formData.errors); // Debug log
        return;
      }
      this.formDataService.setFormData(`step${this.activeStep}`, formData.data);
      console.log(`Form data saved for step ${this.activeStep}:`, formData.data); // Debug log
      this.formData = { ...this.formData, ...formData.data };

      console.log('Current form data:', this.formDataService.getAllFormData()); // Debug log
      this.activeStep++;
      this.router.navigate(['/signup/step' + this.activeStep]).then(() => {
        this.loadStepData();
      });
    } else if (this.activeStep === 4) {
      this.confirm();
    }
  }

  prevStep() {
    if (this.activeStep > 1) {
      this.activeStep--;
      this.router.navigate(['/signup/step' + this.activeStep]).then(() => {
        this.loadStepData();
      });
    }
  }

  confirm() {
    const allData = this.formDataService.getAllFormData();
    console.log('Final submitted data:', allData);
    this.showConfirmation = true;
    this.formDataService.clearFormData(); // Optional: clear data after submission
  }

  saveStepData() {
    // Implement the logic to save data for the current step
    // Return an object with isValid and data properties
    return {
      isValid: true,
      data: this.formDataService.getFormData(`step${this.activeStep}`) || {},
      errors: undefined
    };
  }

  get nextButtonText(): string {
    return this.activeStep === 4 ? 'Confirm' : 'Next Step';
  }
}
