import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { YearCalendarComponent } from 'src/app/components/year-calendar/year-calendar.component';
import { MonthlyDues, TenantMonthlyDuesReport } from 'src/app/core/model/monthly-dues.model';
import { MonthlyDuesService } from 'src/app/core/services/monthly-dues.service';

export class MonthlyDuesView {
  monthlyDueId: string;
  dueDate: string;
  dueAmount: number;
  amountPaid: number;
  status: string;
  isPaid: boolean;
}

@Component({
  selector: 'app-due-details',
  templateUrl: './due-details.component.html',
  styleUrls: ['./due-details.component.scss']
})
export class DueDetailsComponent implements OnInit {
  tenantId = '';
  isLoading = false;
  summary: TenantMonthlyDuesReport = new TenantMonthlyDuesReport();
  yearInputCtrl: FormControl = new FormControl();
  yearDues: MonthlyDues[] = [];
  dataSourceDue = new MatTableDataSource<MonthlyDuesView>();
  displayedColumns = [];
  @ViewChild('paginator', {static: false}) paginator: MatPaginator;
  pageSize = 10;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private monthlyDuesService: MonthlyDuesService,
    private route: ActivatedRoute) {
    this.tenantId = this.route.snapshot.paramMap.get("tenantId");
    this.yearInputCtrl.setValue(new Date().getFullYear())
    this.initPage();
   }

  ngOnInit(): void {
  }

  initPage(){
    this.isLoading = true;
    forkJoin(
      this.monthlyDuesService.getByYearByTenant({
        year: Number(this.yearInputCtrl.value),
        tenantId: this.tenantId
      }),
      this.monthlyDuesService.getSummaryByTenant(this.tenantId)
  ).subscribe(
      ([getYearDues, getSummaryByTenant]) => {
          this.yearDues = getYearDues.data ? getYearDues.data : [];
          this.summary.totalDue = getSummaryByTenant.data.totalDue ? Number(getSummaryByTenant.data.totalDue) : 0;
          this.summary.noOfMonthsDue = getSummaryByTenant.data.monthsDue.length;
          this.summary.dueDate = getSummaryByTenant.data.monthsDue.length > 0 ? new Date(getSummaryByTenant.data.monthsDue[this.summary.noOfMonthsDue - 1].dueDate) : null;
      },
      (error) => console.error(error),
      () => {
        this.displayedColumns = ['monthlyDueId', 'dueDate', 'dueAmount', 'amountPaid', 'status'];
        this.dataSourceDue.data = this.yearDues.map(x=> {
          const due = new MonthlyDuesView();
          due.monthlyDueId = x.monthlyDueId;
          due.dueDate = x.dueDate;
          due.dueAmount = x.dueAmount;
          due.amountPaid = x.amountPaid;
          due.status = x.isPaid ? 'Paid' : 'Unpaid';
          due.isPaid = x.isPaid;
          return due;
        });
        this.dataSourceDue.sort = this.sort;
        this.isLoading = false;
      }
  );
  }

  selectYear(){

    const dialogRef = this.dialog.open(YearCalendarComponent, {
      closeOnNavigation: true,
      panelClass: 'year-calendar-dialog',
    });
    dialogRef.componentInstance.data = new Date(this.yearInputCtrl.value, 1, 0);
    dialogRef.componentInstance.conFirm.subscribe((data: { year: number }) => {
      if(data){
        dialogRef.close();
        this.yearInputCtrl.setValue(data.year);
        this.initPage();
      }
    });
  }
}
