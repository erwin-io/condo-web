import { Component, EventEmitter, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AppConfigService } from 'src/app/core/services/app-config.service';
import { IncidentsReportsService } from 'src/app/core/services/incidents-reports.service';
import { Snackbar } from 'src/app/core/ui/snackbar';
import { IncidentReport } from 'src/app/core/model/incident-report.model';
import { AlertDialogModel } from 'src/app/shared/alert-dialog/alert-dialog-model';
import { AlertDialogComponent } from 'src/app/shared/alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-report-details',
  templateUrl: './report-details.component.html',
  styleUrls: ['./report-details.component.scss'],
})
export class ReportDetailsComponent implements OnInit {
  data: {
    incidentsReportId?: string
  }
  conFirm = new EventEmitter();
  isLoading = false;
  details: IncidentReport;
  error;

  constructor(
    private incidentsReportsService: IncidentsReportsService,
    private dialog: MatDialog,
    private snackBar: Snackbar,
    private appconfig: AppConfigService,
    public dialogRef: MatDialogRef<ReportDetailsComponent>) {
      dialogRef.disableClose = true;
    }

  ngOnInit(): void {
    this.initDetails();
  }

  initDetails(){
    try {
      this.isLoading = true;
      this.
      incidentsReportsService
        .getById(this.data.incidentsReportId)
        .subscribe(
          async (res) => {
            if (res.success) {
              this.details = res.data;
              this.isLoading = false;
            } else {
              this.isLoading = false;
              this.error = Array.isArray(res.message)
                ? res.message[0]
                : res.message;
              this.snackBar.snackbarError(this.error);
            }
          },
          async (err) => {
            this.isLoading = false;
            this.error = Array.isArray(err.message)
              ? err.message[0]
              : err.message;
            this.snackBar.snackbarError(this.error);
          }
        );
    }catch(err){
      this.isLoading = false;
      this.error = Array.isArray(err.message)
        ? err.message[0]
        : err.message;
      this.snackBar.snackbarError(this.error);
    }
  }

  onChangeStatus(statusId){

    const dialogData = new AlertDialogModel();
    dialogData.title = 'Confirm';
    dialogData.message = statusId === 2 ? 'Investigate report?' : 'Closed report?';
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
        this.isLoading = true;
        dialogRef.componentInstance.isProcessing = this.isLoading;
        try {
          this.
          incidentsReportsService
            .updateStatus({ incidentsReportId: this.details.incidentsReportId, incidentStatusId: statusId })
            .subscribe(
              async (res) => {
                if (res.success) {
                  this.details = res.data;
                  this.isLoading = false;
                  this.conFirm.emit(true);
                  this.snackBar.snackbarSuccess("Success!");
                  dialogRef.close();
                  dialogRef.componentInstance.isProcessing = this.isLoading;
                } else {
                  this.isLoading = false;
                  dialogRef.close();
                  dialogRef.componentInstance.isProcessing = this.isLoading;
                  this.error = Array.isArray(res.message)
                    ? res.message[0]
                    : res.message;
                  this.snackBar.snackbarError(this.error);
                }
              },
              async (err) => {
                this.isLoading = false;
                dialogRef.close();
                dialogRef.componentInstance.isProcessing = this.isLoading;
                this.error = Array.isArray(err.message)
                  ? err.message[0]
                  : err.message;
                this.snackBar.snackbarError(this.error);
              }
            );
        }catch(err){
          this.isLoading = false;
          this.error = Array.isArray(err.message)
            ? err.message[0]
            : err.message;
          this.snackBar.snackbarError(this.error);
        }
      }
    });
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }
}
