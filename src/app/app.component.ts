import { Component, inject, OnInit } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog'
import { DialogDataComponent } from './dialog-data/dialog-data.component'
import { ScrollStrategyOptions } from '@angular/cdk/overlay'
import { MatDialogRef } from '@angular/material/dialog'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  scrollStrategy: any
  constructor (
    public dialog: MatDialog,
    private scrollStrategyOptions: ScrollStrategyOptions
  ) {}

  ngOnInit (): void {
    this.scrollStrategy = this.scrollStrategyOptions.noop
  }

  openDailog () {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.scrollStrategy = this.scrollStrategy
    dialogConfig.height = '400px'

    this.dialog.open(DialogDataComponent, {
      height: '700px',
      width: '100%',
      maxWidth: '1500px'
    })
  }
}
