import { Component, OnInit } from '@angular/core';
// import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showPre = false;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};

  activeCustomers = [
    'Store',
    'Category',
    'Region'
  ];

  inactiveCustomers = [];


  ngOnInit() {
    this.dropdownList = [
      { item_id: 1, item_text: '2015' },
      { item_id: 2, item_text: '2016' },
      { item_id: 3, item_text: '2017' },
      { item_id: 4, item_text: '2018' },
      { item_id: 5, item_text: '2019' }
    ];
    this.selectedItems = [
      // { item_id: 3, item_text: 'Pune' },
      // { item_id: 4, item_text: 'Navsari' }
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  onItemSelect() {
    console.log(this.selectedItems);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  onItemDeSelect() {
    console.log(this.selectedItems);
  }

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
