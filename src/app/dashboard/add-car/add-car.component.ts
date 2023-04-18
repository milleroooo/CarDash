import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css'],
})
export class AddCarComponent {
  carForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private snackBarService: SnackbarService,
    private router: Router
  ) {
    this.carForm = fb.group({
      brand: [null, Validators.required],
      model: [null, Validators.required],
      year: [null, Validators.required],
      type: [null, Validators.required],
      gearbox: [null, Validators.required],
      engine_capacity: [null, Validators.required],
      petrol: ['free', Validators.required],
    });
  }

  //Function that checking if the form is valid and pushes data into database
  onSubmit(): void {
    if (this.carForm.valid) {
      this.dataService.addCar({
        brand: this.carForm.value.brand,
        model: this.carForm.value.model,
        year: this.carForm.value.year,
        type: this.carForm.value.type,
        gearbox: this.carForm.value.gearbox,
        engine_capacity: this.carForm.value.engine_capacity,
        petrol: this.carForm.value.petrol,
      });
      this.snackBarService.success('Car has been added successfully.');
      this.router.navigate(['/showCars']);
      this.carForm.reset();
    } else {
      this.snackBarService.error('You need to fill all required fields.');
    }
  }

  hasUnitNumber = false;

  types = [
    { type: 'Hatchback' },
    { type: 'Sedan' },
    { type: 'Suv' },
    { type: 'Crossover' },
    { type: 'Coupe' },
  ];

  years = [
    { year: '2010' },
    { year: '2011' },
    { year: '2012' },
    { year: '2013' },
    { year: '2014' },
    { year: '2015' },
    { year: '2016' },
    { year: '2017' },
    { year: '2018' },
    { year: '2019' },
    { year: '2020' },
    { year: '2021' },
    { year: '2022' },
    { year: '2023' },
  ];

  engine_capacity = [
    { size: '999 cm' },
    { size: '1200 cm' },
    { size: '1300 cm' },
    { size: '1500 cm' },
    { size: '1600 cm' },
    { size: '1700 cm' },
    { size: '1800 cm' },
    { size: '1900 cm' },
    { size: '2000 cm' },
    { size: '2500 cm' },
    { size: '3000 cm' },
  ];

  gearbox = [
    { type: 'Manual' },
    { type: 'Automatic' }
    ];
}
