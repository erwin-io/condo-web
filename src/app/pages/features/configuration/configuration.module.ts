import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [

];


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule.forChild(routes)
  ],
})

export class ConfigurationModule { }
