import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonthlyDueComponent } from './monthly-due.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MaterialModule } from 'src/app/material/material.module';
import { DueDetailsComponent } from './due-details/due-details.component';

export const routes: Routes = [
  {
    path: '',
    component: MonthlyDueComponent,
    pathMatch: 'full'
  },
  {
    path: 'due-details/:tenantId',
    component: DueDetailsComponent
  }
];

@NgModule({
  declarations: [
    MonthlyDueComponent,
    DueDetailsComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    NgxSkeletonLoaderModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class MonthlyDueModule { }
