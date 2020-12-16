import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})

export class LayoutComponent implements OnInit {
  // layout related config
  layoutType: string;
  layoutWidth: string;
  leftSidebarTheme: string;
  leftSidebarWidth: string;

  constructor() { }

  ngOnInit() {
    
  }

}
