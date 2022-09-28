import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Snackbar } from '../../../core/ui/snackbar';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AlertDialogModel } from 'src/app/shared/alert-dialog/alert-dialog-model';
import { AlertDialogComponent } from 'src/app/shared/alert-dialog/alert-dialog.component';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { RoomService } from 'src/app/core/services/room.service';
import { Room } from 'src/app/core/model/room.model';
import { AddRoomComponent } from './add-room/add-room.component';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RoomsComponent implements OnInit {
  error:string;
  dataSource = new MatTableDataSource<Room>();
  data: Room[] = [];
  displayedColumns = [];
  isLoading = false;
  loaderData =[];
  isProcessing = false;
  @ViewChild('paginator', {static: false}) paginator: MatPaginator;
  pageSize = 10;

  keywordCtrl = new FormControl('');

  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private roomService: RoomService,
    private snackBar: Snackbar,
    private dialog: MatDialog,
    public router: Router) { }

  ngOnInit(): void {
    this.getRooms();
    this.generateLoaderData(this.pageSize);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  async add(){
    const dialogRef = this.dialog.open(AddRoomComponent, {
      closeOnNavigation: true,
      panelClass: 'room-dialog',
    });
    dialogRef.componentInstance.data = null;
    dialogRef.componentInstance.conFirm.subscribe((data: boolean) => {
      if(data){
        dialogRef.close();
        this.getRooms();
      }
    });
  }

  async edit(roomId: string){

    const dialogRef = this.dialog.open(AddRoomComponent, {
      closeOnNavigation: true,
      panelClass: 'room-dialog',
    });
    dialogRef.componentInstance.data = { roomId };
    dialogRef.componentInstance.conFirm.subscribe((data: boolean) => {
      if(data){
        dialogRef.close();
        this.getRooms();
      }
    });
  }

  async remove(roomId: string){
    const dialogData = new AlertDialogModel();
    dialogData.title = 'Confirm';
    dialogData.message = 'Delete room?';
    dialogData.confirmButton = {
      visible: true,
      text: 'yes',
      color: 'primary',
    };
    dialogData.dismissButton = {
      visible: true,
      text: 'cancel',
    };
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      maxWidth: '400px',
      closeOnNavigation: true,
    });

    dialogRef.componentInstance.alertDialogConfig = dialogData;
    dialogRef.componentInstance.conFirm.subscribe(async (confirm: any) => {
      if(confirm) {
        this.isProcessing = true;
        dialogRef.componentInstance.isProcessing = this.isProcessing;
        try {
          this.roomService
            .delete(roomId)
            .subscribe(
              async (res) => {
                if (res.success) {
                  this.getRooms();
                  dialogRef.close();
                  this.isProcessing = false;
                  dialogRef.componentInstance.isProcessing = this.isProcessing;
                } else {
                  this.isProcessing = false;
                  dialogRef.componentInstance.isProcessing = this.isProcessing;
                  this.error = Array.isArray(res.message)
                    ? res.message[0]
                    : res.message;
                  this.snackBar.snackbarError(this.error);
                }
              },
              async (err) => {
                this.isProcessing = false;
                dialogRef.componentInstance.isProcessing = this.isProcessing;
                this.error = Array.isArray(err.message)
                  ? err.message[0]
                  : err.message;
                this.snackBar.snackbarError(this.error);
              }
            );
        } catch (e) {
          this.isProcessing = false;
          dialogRef.componentInstance.isProcessing = this.isProcessing;
          this.error = Array.isArray(e.message) ? e.message[0] : e.message;
          this.snackBar.snackbarError(this.error);
        }
      }
    });
  }

  filter() {
    this.isLoading = true;
    const keyword = this.keywordCtrl.value.toLowerCase();
    this.dataSource.data = this.data.length > 0 ?
    this.data.filter(x=>x.roomId.toLowerCase().includes(keyword) ||
    x.name.toLowerCase().includes(keyword) ||
    x.monthlyRate.toString().toLowerCase().includes(keyword)) : [];
    this.dataSource.paginator = this.paginator;
    this.isLoading = false;
  }

  getRooms(){
    this.displayedColumns = ['roomId', 'name', 'monthlyRate', 'controls'];
    try{
      this.isLoading = true;
      this.roomService.get()
      .subscribe(async res => {
        if(res.success){
          this.data = res.data;
          this.dataSource.data = this.data;
          this.dataSource.paginator = this.paginator;
          this.isLoading = false;
        }
        else{
          this.error = Array.isArray(res.message) ? res.message[0] : res.message;
          this.snackBar.snackbarError(this.error);
          this.isLoading = false;
        }
      }, async (err) => {
        this.error = Array.isArray(err.message) ? err.message[0] : err.message;
        this.snackBar.snackbarError(this.error);
        this.isLoading = false;
      });
    }
    catch(e){
      this.error = Array.isArray(e.message) ? e.message[0] : e.message;
      this.snackBar.snackbarError(this.error);
    }

  }

  generateLoaderData(length: number){
    for (let i = 0; i < length; i++) {
      this.loaderData.push(i);
    }

  }
}
