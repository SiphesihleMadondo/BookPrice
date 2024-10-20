import { AfterViewInit, Component } from '@angular/core'
import {
  MatDialogContent,
  MatDialogModule,
  MatDialogTitle
} from '@angular/material/dialog'
import { ViewChild } from '@angular/core'
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator'
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { BookPrice } from '../models/book-price'
import { SBookPriceService } from '../service/s-book-price.service'
import { CommonModule } from '@angular/common'
import { MatSort, Sort } from '@angular/material/sort'
import { MatSortModule } from '@angular/material/sort'
import { MatFormField, MatLabel } from '@angular/material/form-field'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { ExcelServiceService } from '../service/excel-service.service'

@Component({
  selector: 'app-dialog-data',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatTableModule,
    MatPaginatorModule,
    CommonModule,
    MatSortModule,
    MatFormField,
    MatLabel,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule
  ],
  templateUrl: './dialog-data.component.html',
  styleUrl: './dialog-data.component.css'
})
export class DialogDataComponent implements AfterViewInit {
  Image_url = '../assets/Icons/users_icon.png'
  bookPrices: BookPrice[] = []
  displayedColumns: string[] = [
    '_user',
    'clientName',
    'statementd',
    'policynumber',
    'productProvider',
    'adjustedRevenue',
    'adjustedAssetValue',
    'bookPrice1'
  ]
  dataSource = new MatTableDataSource(this.bookPrices)

  @ViewChild(MatSort) sort!: MatSort
  @ViewChild(MatPaginator) paginator!: MatPaginator

  constructor (
    protected bookPrice: SBookPriceService,
    protected excelService: ExcelServiceService
  ) {}

  ngAfterViewInit (): void {
    this.returnClients()
    this.dataSource.sort = this.sort
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0))
  }

  returnClients () {
    this.bookPrice.getClients().subscribe((data: BookPrice[]) => {
      this.bookPrices = data
      this.dataSource.data = this.bookPrices

      const sortState: Sort = { active: 'clientName', direction: 'asc' }
      this.sort.active = sortState.active
      this.sort.direction = sortState.direction
      this.sort.sortChange.emit(sortState)
      this.dataSource.paginator = this.paginator

      console.log(this.bookPrices)
    })
  }

  applyFilter (event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }

  exportAsXLSX (): void {
    //mapped field or properties needs to be exact to the ones from the response
    this.excelService.exportToExcel(
      this.bookPrices.map(x => ({
        Partner: x.partner,
        Client: x.clientName,
        'Policy Number': x.policynumber,
        'Product Provider': x.productProvider,
        'Adjusted Revenue': x.adjustedRevenue,
        'Adjusted Asset Value': x.adjustedAssetValue,
        'Book Price': x.bookPrice1,
        'Statement Date': x.statementDate
      })),
      'Clients'
    )
  }
}
