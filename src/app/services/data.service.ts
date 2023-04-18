import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Car } from '../modal/car';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  carSubject = new Subject<Car[]>();

  constructor(private afs: AngularFirestore) {}

  //Function that returns all cars from database and subscribes them
  getAllCars() {
    this.afs
      .collection('/Cars')
      .valueChanges()
      .subscribe((car: unknown[]): void => {
        this.carSubject.next(car as Car[]);
      });
  }

  //Function that add car to the database
  addCar(car: Car) {
    return this.afs.collection('/Cars').add(car);
  }
}
