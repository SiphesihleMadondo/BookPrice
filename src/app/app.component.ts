import { Component, inject, OnInit } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogConfig
} from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button'
import { DialogDataComponent } from './dialog-data/dialog-data.component'
import { SBookPriceService } from './service/s-book-price.service'
import { ScrollStrategyOptions } from '@angular/cdk/overlay'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  scrollStrategy: any;
  constructor (public dialog: MatDialog,  private scrollStrategyOptions: ScrollStrategyOptions) {}


  ngOnInit(): void {
    this.scrollStrategy = this.scrollStrategyOptions.noop
  }

  openDailog () {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.scrollStrategy = this.scrollStrategy;
    dialogConfig.height = '400px'

    this.dialog.open(DialogDataComponent, {
    
      //height: '500px',
      maxWidth: '1500px',
      maxHeight: '500px'
      
    })

    
  }
}
