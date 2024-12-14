import { Component, OnInit } from '@angular/core';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { FormDataService } from '../../../shared/form-data.service';

@Component({
  selector: 'app-select-plan',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    NgClass
  ],
  templateUrl: './select-plan.component.html',
  styleUrls: ['./select-plan.component.css']
})
export class SelectPlanComponent implements OnInit {
  selectedPlan: any;
  yearlyPlans = [
    { name: 'Arcade', price: '$9/mo', imgUrl: 'assets/images/icon-arcade.svg' },
    { name: 'Advance', price: '$12/mo', imgUrl: 'assets/images/icon-advanced.svg' },
    { name: 'Pro', price: '$15/mo', imgUrl: 'assets/images/icon-pro.svg' }
  ];

  monthlyPlans = [
    { name: 'Arcade', price: '$90/mo', imgUrl: 'assets/images/icon-arcade.svg', free: '2 months free' },
    { name: 'Advance', price: '$120/mo', imgUrl: 'assets/images/icon-advanced.svg', free: '2 months free' },
    { name: 'Pro', price: '$150/mo', imgUrl: 'assets/images/icon-pro.svg', free: '2 months free' }
  ];

  isMonthly: boolean = false;

  constructor(private formDataService: FormDataService) {}

  ngOnInit() {
    const savedData = this.formDataService.getFormData('selectPlan');
    if (savedData) {
      this.selectedPlan = savedData;
    }
  }

  togglePlan() {
    this.isMonthly = !this.isMonthly;
  }

  selectPlan(plan: any) {
    this.selectedPlan = plan;
    this.formDataService.setFormData('selectPlan', this.selectedPlan);
    console.log('Selected plan:', plan);
  }
}
