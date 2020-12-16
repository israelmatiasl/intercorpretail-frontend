import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { SideLayoutComponent } from './side-layout/side-layout.component';
import { TopbarLayoutComponent } from './topbar-layout/topbar-layout.component';

@NgModule({
  declarations: [
    LayoutComponent,
    SideLayoutComponent,
    TopbarLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [],
  providers: []
})
export class LayoutsModule { }