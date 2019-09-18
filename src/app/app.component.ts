import { Component } from '@angular/core';

import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showPre = false;
  activeCustomers = [
    'Store',
    'Category',
    'Region'
  ];

  inactiveCustomers = [];

  drop(event: CdkDragDrop<string[]>) {

    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    
    this.pre = JSON.stringify(this.inactiveCustomers, null, ' ');
    
  }

  pre = JSON.stringify(this.inactiveCustomers, null, ' ');

}
