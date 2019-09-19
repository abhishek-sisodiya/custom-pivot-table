import { Component, OnInit } from '@angular/core';
// import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormGroup, FormControl } from '@angular/forms';

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
  from : string;
  to : string;
  cities= [];
  selectedItem1 = [];
  dropdownSettings1 = {};
  closeDropdownSelection=false;
  disabled=false;

  activeCustomers = [
    'Store',
    'Category',
    'Region'
  ];

  inactiveCustomers = [];
  formdata: any;


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

    this.cities = ['Year', 'Month', 'Quater', 'Week'];
    this.selectedItem1 = [];
    this.dropdownSettings1 = {
        singleSelection: true,
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        allowSearchFilter: true,
        closeDropDownOnSelection: this.closeDropdownSelection
    };
    this.formdata = new FormGroup({
      from: new FormControl(""),
      to: new FormControl("")
   });
  }
  onItemSelect1(item: any) {
    console.log('onItemSelect', item);
}
toggleCloseDropdownSelection() {
  this.closeDropdownSelection = !this.closeDropdownSelection;
  this.dropdownSettings1 = Object.assign({}, this.dropdownSettings1,{closeDropDownOnSelection: this.closeDropdownSelection});
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
