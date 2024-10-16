import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { BookPrice } from '../models/book-price';
import { SBookPriceService } from '../service/s-book-price.service';
import { CommonModule } from '@angular/common';
import { MatSort, Sort } from '@angular/material/sort';
import { MatSortModule } from '@angular/material/sort'; // Import MatSortModule
import { LiveAnnouncer } from '@angular/cdk/a11y';


@Component({
  selector: 'app-dialog-data',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent,MatTableModule, MatPaginatorModule, CommonModule,MatSortModule],
  templateUrl: './dialog-data.component.html',
  styleUrl: './dialog-data.component.css'
})
export class DialogDataComponent implements OnInit {

  private _liveAnnouncer = inject(LiveAnnouncer);
  bookPrices: BookPrice[] = [];
  data = inject(MAT_DIALOG_DATA);
  displayedColumns: string [] = ['Partner', 'Client Name', 'Statement Date', 'Policy Number', 'Product Provider', 'Adjusted Revenue', 'Adjusted Asset Value', 'Book Price']
  dataSource = new MatTableDataSource<BookPrice>(this.bookPrices)

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor (protected bookPrice: SBookPriceService) {}

  ngAfterContentInit(): void {
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
  }

  ngOnInit (): void {

    this.returnClients();
  }

  returnClients () {
    this.bookPrice.getClients().subscribe(response => {

      this.bookPrices = response;
      this.dataSource = new MatTableDataSource<BookPrice>(this.bookPrices)
      this.dataSource.sort = this.sort
      this.dataSource.paginator = this.paginator
     
      //console.log(this.bookPrices)
      
    })
  }

  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

}
