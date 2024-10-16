import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import {ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { BookPrice } from '../models/book-price';
import { SBookPriceService } from '../service/s-book-price.service';
import { CommonModule } from '@angular/common';
import { MatSort, Sort } from '@angular/material/sort';
import { MatSortModule } from '@angular/material/sort'; // Import MatSortModule
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-dialog-data',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent,MatTableModule, MatPaginatorModule, CommonModule,MatSortModule, 
    MatFormField, MatLabel, MatFormFieldModule, MatInputModule],
  templateUrl: './dialog-data.component.html',
  styleUrl: './dialog-data.component.css'
})
export class DialogDataComponent implements OnInit {

  private _liveAnnouncer = inject(LiveAnnouncer);
  bookPrices: BookPrice[] = [];
  data = inject(MAT_DIALOG_DATA);
  displayedColumns: string [] = ['Partner', 'Client Name', 'Statement Date', 'Policy Number', 'Product Provider', 'Adjusted Revenue', 'Adjusted Asset Value', 'Book Price']
  dataSource = new MatTableDataSource<any>

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor (protected bookPrice: SBookPriceService) {}

  

  ngOnInit (): void {
      
    this.returnClients();

  }

  ngAfterContentInit(): void {
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
  } 

  returnClients () {
    this.bookPrice.getClients().subscribe(response => {

      this.dataSource.data = response;
      //

      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
      const sortState: Sort = { active: 'Client Name', direction: 'asc' };
      this.sort.active = sortState.active;
      this.sort.direction = sortState.direction;
      this.sort.sortChange.emit(sortState);
     
      console.log(this.dataSource)
      
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
