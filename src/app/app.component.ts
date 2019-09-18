import { Component } from '@angular/core';

import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showPre=false;
  customers = [
    { name: 'Store'},
    { name: 'Category'},
    { name: 'Region'},
  ];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.customers, event.previousIndex, event.currentIndex);
    this.pre = JSON.stringify(this.customers, null, ' ');
  }

  pre = JSON.stringify(this.customers, null, ' ');
}
