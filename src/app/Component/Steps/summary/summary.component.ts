import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent {
  @Input() formData: any;
  // If you want to communicate back to parent component
  @Output() changePlanEvent = new EventEmitter<void>();

  constructor(private router: Router) {} // Inject Router

  calculateTotal() {
    let total = 0;

    if (this.formData?.selectPlan) {
      const price = this.formData.selectPlan.price?.replace('$', '').replace('/mo', '');
      total += parseFloat(price) || 0; // Fallback to 0 if parse fails
    }

    if (this.formData?.addOns?.length) {
      this.formData.addOns.forEach((addOn: any) => {
        const price = addOn?.price?.replace('+$', '').replace('/mo', '');
        total += parseFloat(price) || 0; // Fallback to 0 if parse fails
      });
    }

    return total;
  }

  changePlan() {
    // Option 1: Navigate directly
    this.router.navigate(['/step3']);

    // Option 2: Emit event for parent component to handle
    this.changePlanEvent.emit();
  }
}
