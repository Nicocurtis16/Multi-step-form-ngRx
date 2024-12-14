import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormDataService } from '../../../shared/form-data.service';

@Component({
  selector: 'app-add-ons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-ons.component.html',
  styleUrls: ['./add-ons.component.css']
})
export class AddOnsComponent implements OnInit {
  options = [
    { optionTitle: 'Online service', optionInfo: 'Access to multiplayer games', price: '+$10/yr' },
    { optionTitle: 'Larger storage', optionInfo: 'Extra 1TB of cloud save', price: '+$20/yr' },
    { optionTitle: 'Customizable profile', optionInfo: 'Custom theme on your profile', price: '+$20/yr' }
  ];
  selectedOptions: any[] = [];

  constructor(private formDataService: FormDataService) {}

  ngOnInit() {
    const savedData = this.formDataService.getFormData('addOns');
    if (savedData) {
      this.selectedOptions = savedData;
    }
  }

  onCheckboxChange(event: any, option: any) {
    if (event.target.checked) {
      this.selectedOptions.push(option);
    } else {
      const index = this.selectedOptions.findIndex(o => o.optionTitle === option.optionTitle);
      if (index > -1) {
        this.selectedOptions.splice(index, 1);
      }
    }
    this.formDataService.setFormData('addOns', this.selectedOptions);
    console.log('Selected options:', this.selectedOptions);
  }

  isChecked(option: any): boolean {
    return this.selectedOptions.some(o => o.optionTitle === option.optionTitle);
  }
}
