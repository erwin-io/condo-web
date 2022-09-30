import { Component, EventEmitter, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AppConfigService } from 'src/app/core/services/app-config.service';
import { IncidentsReportsService } from 'src/app/core/services/incidents-reports.service';
import { Snackbar } from 'src/app/core/ui/snackbar';
import { IncidentReport } from 'src/app/core/model/incident-report.model';

@Component({
  selector: 'app-report-details',
  templateUrl: './report-details.component.html',
  styleUrls: ['./report-details.component.scss']
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
    public dialogRef: MatDialogRef<ReportDetailsComponent>) { }

  ngOnInit(): void {

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

}
