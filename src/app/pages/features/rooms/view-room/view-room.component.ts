import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { menu } from 'src/app/core/model/menu';
import { Room } from 'src/app/core/model/room.model';
import { Tenant } from 'src/app/core/model/tenant.model';
import { RoomService } from 'src/app/core/services/room.service';
import { StorageService } from 'src/app/core/storage/storage.service';
import { Snackbar } from 'src/app/core/ui/snackbar';
import { AlertDialogModel } from 'src/app/shared/alert-dialog/alert-dialog-model';
import { AlertDialogComponent } from 'src/app/shared/alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-view-room',
  templateUrl: './view-room.component.html',
  styleUrls: ['./view-room.component.scss']
})
export class ViewRoomComponent implements OnInit {

  room:Room = new Room();
  loading = false;
  error: string;
  isProcessing = false;
  isLoading = false;
  menuModule = [];
  public dataSource = new MatTableDataSource<Tenant>([]);
  displayedColumns = [];
  selectedPage = [];
  @ViewChild('paginator') private paginator: MatPaginator;
  pageSize = 10;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private roomService: RoomService,
    private storageService: StorageService,
    private snackBar: Snackbar) { }

  ngOnInit(): void {
    this.displayedColumns = ['id', 'fullName', 'email', 'mobileNumber', 'controls'];
    const roomId = this.route.snapshot.paramMap.get("roomId");;

    this.getRoom(roomId);
  }
  ngAfterViewInit(): void {
      this.dataSource.paginator = this.paginator;
  }

  async getRoom(roomId:string){
    this.isLoading = true;
    try{
      await this.roomService.getById(roomId)
      .subscribe(async res => {
        if(res.success){
          this.room = res.data;
          this.dataSource.data = res.data.tenants;
          this.isLoading = false;
        }
        else{
          this.isLoading = false;
          this.error = Array.isArray(res.message) ? res.message[0] : res.message;
          this.snackBar.snackbarError(this.error);
          if(this.error.toLowerCase().includes("not found")){
            this.router.navigate(['/rooms/']);
          }
        }
      }, async (err) => {
        this.isLoading = false;
        this.error = Array.isArray(err.message) ? err.message[0] : err.message;
        this.snackBar.snackbarError(this.error);
        if(this.error.toLowerCase().includes("not found")){
          this.router.navigate(['/rooms/']);
        }
      });
    }catch(e){
      this.isLoading = false;
      this.error = Array.isArray(e.message) ? e.message[0] : e.message;
      this.snackBar.snackbarError(this.error);
      if(this.error.toLowerCase().includes("not found")){
        this.router.navigate(['/rooms/']);
      }
    }
  }

}

