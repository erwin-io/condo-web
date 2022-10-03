import { Component, EventEmitter, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-year-calendar',
  templateUrl: './year-calendar.component.html',
  styleUrls: ['./year-calendar.component.scss']
})
export class YearCalendarComponent implements OnInit {
  data: Date;
  conFirm = new EventEmitter();

  constructor() { }

  ngOnInit(): void {

  }

  yearSelectedHandler(event){
    this.conFirm.emit({ year: new Date(event).getFullYear()});
  }
}
