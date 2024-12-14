import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {
  private formData: { [key: string]: any } = {};
  private storageKey = 'formData'; // Key to store data in localStorage

  constructor() {
    const storedData = localStorage.getItem(this.storageKey);
    if (storedData) {
      this.formData = JSON.parse(storedData);
      console.log('Loaded data from localStorage:', this.formData); // Debug log
    }
  }

  setFormData(step: string, data: any) {
    this.formData[step] = data;
    console.log(`Saving data for step ${step}:`, data); // Debug log
    this.saveToLocalStorage();
  }

  getFormData(step: string) {
    return this.formData[step] || null;
  }

  getAllFormData() {
    return this.formData;
  }

  clearFormData() {
    this.formData = {};
    localStorage.removeItem(this.storageKey);
  }

  private saveToLocalStorage() {
    console.log('Saving to localStorage:', this.formData);
    localStorage.setItem(this.storageKey, JSON.stringify(this.formData));
  }

}
