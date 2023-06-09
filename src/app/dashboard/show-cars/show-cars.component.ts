import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy, } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Car } from 'src/app/modal/car';
import { DataService } from 'src/app/services/data.service';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-show-cars',
  templateUrl: './show-cars.component.html',
  styleUrls: ['./show-cars.component.css']
})

export class ShowCarsComponent implements OnInit, OnDestroy, AfterViewInit {
  displayedColumns = ['brand', 'model', 'year', 'type', 'gearbox', 'engine_capacity', 'petrol'];
  dataSource = new MatTableDataSource<Car>();
  carSubscription!: Subscription;

  rows: Car[] = [];
  pageSizeOptions = [5, 10, 25, 50];
  pageSize = 5;
  totalRows = 0;
  enablePagination = true;
  isLoading = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.carSubscription =
    this.dataService.carSubject.subscribe(
      (cars: Car[]) => {
        this.dataSource.data = cars;
        this.isLoading = false;
      }
    );
    setTimeout(() => {
      this.dataService.getAllCars();
    }, 2000);
  }

  //Function that shows all data (only if pagination is not enabled)
  togglePagination() {
    this.dataSource.paginator = null;
  }

  //Function that filters html target values from table (dataSource) and deleting whitespaces by trim(), lowercasing values by toLowerCase();
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit(): void {
    this.dataSource = new MatTableDataSource<Car>(this.rows);
    this.totalRows = this.rows.length;
    if (this.enablePagination) {
      this.dataSource.paginator = this.paginator;
    }
  }

  ngOnDestroy(): void {
    if (this.carSubscription) {
      this.carSubscription.unsubscribe();
    }
  }
}
