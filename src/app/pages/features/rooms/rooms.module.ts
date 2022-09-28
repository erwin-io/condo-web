import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewRoomComponent } from './view-room/view-room.component';
import { RoomsComponent } from './rooms.component';
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MaterialModule } from 'src/app/material/material.module';
import { AddRoomComponent } from './add-room/add-room.component';
import { Snackbar } from 'src/app/core/ui/snackbar';

export const routes: Routes = [
  {
    path: '',
    component: RoomsComponent,
    pathMatch: 'full'
  },
  {
    path: 'details/:roomId',
    component: ViewRoomComponent
  },
];


@NgModule({
  declarations: [
    RoomsComponent,
    ViewRoomComponent,
    AddRoomComponent
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
export class RoomsModule { }
