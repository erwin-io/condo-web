import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from 'express';
import { IncidentReport } from 'src/app/core/model/incident-report.model';
import { IncidentsReportsService } from 'src/app/core/services/incidents-reports.service';
import { Snackbar } from 'src/app/core/ui/snackbar';
import { AlertDialogModel } from 'src/app/shared/alert-dialog/alert-dialog-model';
import { AlertDialogComponent } from 'src/app/shared/alert-dialog/alert-dialog.component';
import { ReportDetailsComponent } from './report-details/report-details.component';

export class IncidentReportView {
  incidentsReportId: string;
  date: Date;
  title: string;
  tenantName: string;
  tenantRoomName: string;
}

@Component({
  selector: 'app-incident-report',
  templateUrl: './incident-report.component.html',
  styleUrls: ['./incident-report.component.scss']
})
export class IncidentReportComponent implements OnInit {
  error:string;
  dataSource = new MatTableDataSource<IncidentReportView>();
  data: IncidentReport[] = [];
  displayedColumns = [];
  isLoading = false;
  loaderData =[];
  isProcessing = false;
  @ViewChild('paginator', {static: false}) paginator: MatPaginator;
  pageSize = 10;

  keywordCtrl = new FormControl('');

  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private incidentsReportsService: IncidentsReportsService,
    private snackBar: Snackbar,
    private dialog: MatDialog,
    public router: Router) { }

  ngOnInit(): void {
    this.getAllReports();
    this.generateLoaderData(this.pageSize);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  async details(roomId: string){

    const dialogRef = this.dialog.open(ReportDetailsComponent, {
      closeOnNavigation: true,
      panelClass: 'report-details-dialog',
    });
    // dialogRef.componentInstance.data = { roomId };
    dialogRef.componentInstance.conFirm.subscribe((data: boolean) => {
      if(data){
        dialogRef.close();
        this.getAllReports();
      }
    });
  }

  // async remove(roomId: string){
  //   const dialogData = new AlertDialogModel();
  //   dialogData.title = 'Confirm';
  //   dialogData.message = 'Delete room?';
  //   dialogData.confirmButton = {
  //     visible: true,
  //     text: 'yes',
  //     color: 'primary',
  //   };
  //   dialogData.dismissButton = {
  //     visible: true,
  //     text: 'cancel',
  //   };
  //   const dialogRef = this.dialog.open(AlertDialogComponent, {
  //     maxWidth: '400px',
  //     closeOnNavigation: true,
  //   });

  //   dialogRef.componentInstance.alertDialogConfig = dialogData;
  //   dialogRef.componentInstance.conFirm.subscribe(async (confirm: any) => {
  //     if(confirm) {
  //       this.isProcessing = true;
  //       dialogRef.componentInstance.isProcessing = this.isProcessing;
  //       try {
  //         this.roomService
  //           .delete(roomId)
  //           .subscribe(
  //             async (res) => {
  //               if (res.success) {
  //                 this.getRooms();
  //                 dialogRef.close();
  //                 this.isProcessing = false;
  //                 dialogRef.componentInstance.isProcessing = this.isProcessing;
  //               } else {
  //                 this.isProcessing = false;
  //                 dialogRef.componentInstance.isProcessing = this.isProcessing;
  //                 this.error = Array.isArray(res.message)
  //                   ? res.message[0]
  //                   : res.message;
  //                 this.snackBar.snackbarError(this.error);
  //               }
  //             },
  //             async (err) => {
  //               this.isProcessing = false;
  //               dialogRef.componentInstance.isProcessing = this.isProcessing;
  //               this.error = Array.isArray(err.message)
  //                 ? err.message[0]
  //                 : err.message;
  //               this.snackBar.snackbarError(this.error);
  //             }
  //           );
  //       } catch (e) {
  //         this.isProcessing = false;
  //         dialogRef.componentInstance.isProcessing = this.isProcessing;
  //         this.error = Array.isArray(e.message) ? e.message[0] : e.message;
  //         this.snackBar.snackbarError(this.error);
  //       }
  //     }
  //   });
  // }

  filter() {
  }

  getAllReports(){
    this.displayedColumns = ['incidentsReportId', 'date', 'title', 'tenantName', 'tenantRoomName', 'controls'];
    try{
      this.isLoading = true;
      this.incidentsReportsService.getAll({ keyword: this.keywordCtrl.value })
      .subscribe(async res => {
        if(res.success){
          this.data = res.data;
          this.dataSource.data = this.data.map(x=> {
            const report = new IncidentReportView();
            report.incidentsReportId = x.incidentsReportId;
            report.date = x.date;
            report.title = x.title;
            report.tenantName = x.tenant.fullName;
            report.tenantRoomName = x.tenant.room.name;
            return report;
          });
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
