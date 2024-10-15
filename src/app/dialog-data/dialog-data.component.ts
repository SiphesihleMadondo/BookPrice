import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { BookPrice } from '../models/book-price';
import { SBookPriceService } from '../service/s-book-price.service';


@Component({
  selector: 'app-dialog-data',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent,MatTableModule, MatPaginatorModule],
  templateUrl: './dialog-data.component.html',
  styleUrl: './dialog-data.component.css'
})
export class DialogDataComponent implements OnInit {

  
  bookPrices: BookPrice[] = [];
  data = inject(MAT_DIALOG_DATA);
  displayedColumns: string [] = ['Partner', 'Client Name', 'Statement Date', 'Policy Number', 'Product Provider', 'Adjusted Revenue', 'Adjusted Asset Value', 'Book Price']
  dataSource = new MatTableDataSource<BookPrice>(this.bookPrices)

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor (protected bookPrice: SBookPriceService) {}

  ngAfterContentInit(): void {
    this.dataSource.paginator = this.paginator
  }

  ngOnInit (): void {

    this.returnClients();
  }

  returnClients () {
    this.bookPrice.getClients().subscribe(response => {

      this.bookPrices = response;
      this.dataSource = new MatTableDataSource<BookPrice>(this.bookPrices)
      this.dataSource.paginator = this.paginator
      //console.log(this.bookPrices)
    })
  }

}
