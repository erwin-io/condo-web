import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { TenantMonthlyDuesReport } from 'src/app/core/model/monthly-dues.model';
import { MonthlyDuesService } from 'src/app/core/services/monthly-dues.service';
import { Snackbar } from 'src/app/core/ui/snackbar';
import { AlertDialogModel } from 'src/app/shared/alert-dialog/alert-dialog-model';
import { AlertDialogComponent } from 'src/app/shared/alert-dialog/alert-dialog.component';
import { DueDetailsComponent } from './due-details/due-details.component';

@Component({
  selector: 'app-monthly-due',
  templateUrl: './monthly-due.component.html',
  styleUrls: ['./monthly-due.component.scss']
})
export class MonthlyDueComponent implements OnInit {
  error:string;
  dataSource = new MatTableDataSource<TenantMonthlyDuesReport>();
  data: TenantMonthlyDuesReport[] = [];
  displayedColumns = [];
  isLoading = false;
  loaderData =[];
  isProcessing = false;
  @ViewChild('paginator', {static: false}) paginator: MatPaginator;
  pageSize = 10;

  keywordCtrl = new FormControl('');

  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private monthlyDuesService: MonthlyDuesService,
    private snackBar: Snackbar,
    private dialog: MatDialog,
    public router: Router) { }

  ngOnInit(): void {
    this.getAllTenant();
    this.generateLoaderData(this.pageSize);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  async details(incidentsReportId: string){

    const dialogRef = this.dialog.open(DueDetailsComponent, {
      closeOnNavigation: true,
      panelClass: 'due-details-dialog',
    });
  }

  async generateDue(){
    const tenants = this.data;
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
        const generatedDate = new Date();
        try {
          tenants.forEach(t=>{
            this.monthlyDuesService
            .add({ tenantId: t.tenantId, dueDate: generatedDate, generatedDate})
            .subscribe(
              async (res) => {
                if (res.success) {
                  this.getAllTenant();
                  dialogRef.close();
                  this.isProcessing = false;
                  dialogRef.componentInstance.isProcessing = this.isProcessing;
                  this.snackBar.snackbarSuccess("Success!");
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
          })
        } catch (e) {
          this.isProcessing = false;
          dialogRef.componentInstance.isProcessing = this.isProcessing;
          this.error = Array.isArray(e.message) ? e.message[0] : e.message;
          this.snackBar.snackbarError(this.error);
        }
      }
    });
  }

  getAllTenant(){
    this.displayedColumns = ['tenantId', 'fullName', 'totalDue', 'dueDate', 'noOfMonthsDue', 'controls'];
    try{
      this.isLoading = true;
      this.monthlyDuesService.getAllTenant()
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

  filter(){
    this.isLoading = true;
    const keyword = this.keywordCtrl.value.toLowerCase();
    this.dataSource.data = this.data.length > 0 ?
    this.data.filter(x=>moment(x.dueDate).format('YYYY-MM-DD').toString().toLowerCase().includes(keyword) ||
    moment(x.dueDate).format('MMMM DD, YYYY').toString().toLowerCase().includes(keyword) ||
    x.tenantId.toLowerCase().includes(keyword) ||
    x.fullName.toString().toLowerCase().includes(keyword)) : [];
    this.dataSource.paginator = this.paginator;
    this.isLoading = false;
  }

  generateLoaderData(length: number){
    for (let i = 0; i < length; i++) {
      this.loaderData.push(i);
    }

  }
}
