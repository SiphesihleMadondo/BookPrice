import { Component, inject, OnInit } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog'
import { DialogDataComponent } from './dialog-data/dialog-data.component'
import { ScrollStrategyOptions } from '@angular/cdk/overlay'
import { MatDialogRef } from '@angular/material/dialog'
import { SBookPriceService } from './service/s-book-price.service'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { Partner } from './models/partner'
import { BookPrice } from './models/book-price'
import { SharedService } from './service/shared.service'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule, DialogDataComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  scrollStrategy: any
  selectedValue: string = ''
  partners: Partner[] = []
  bookPrices: BookPrice[] = []
  partnerNames: string[] = []
   selectedItem: string = ''

  constructor (
    public dialog: MatDialog,
    private scrollStrategyOptions: ScrollStrategyOptions,
    protected bookPrice: SBookPriceService,
    protected dataService: SharedService
  ) {}

  ngOnInit (): void {
    this.scrollStrategy = this.scrollStrategyOptions.noop
    this.Partners()
  }

  sendData(selected: string) {
    this.dataService.changeData(selected);
  }

  Partners () {
    this.bookPrice.Partners().subscribe((partners: Partner[]) => {
      this.partners = partners

      //console.log(this.partners)
    })
  }

  onChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedItem = selectElement.value;
    console.log(this.selectedItem)
  }

  openDailog () {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.scrollStrategy = this.scrollStrategy
    dialogConfig.height = '400px'

    this.dialog.open(DialogDataComponent, {
      height: '700px',
      width: '100%',
      maxWidth: '1298px',
      panelClass: 'no-border-radius'
      //maxHeight: '850px'
    })
  }
}
