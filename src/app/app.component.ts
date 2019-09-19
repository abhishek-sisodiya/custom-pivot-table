import { Component, OnInit } from '@angular/core';
// import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient) { }

  showPre = false;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  from: string;
  to: string;
  cities = [];
  selectedItem1 = [];
  dropdownSettings1 = {};
  closeDropdownSelection = false;
  disabled = false;
  data;
  activeCustomers = [
    'Store',
    'Category',
    'Region'
  ];
  namedMonths = ["February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", "January"];
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


    this.getJSON().subscribe(data => {
      console.log(data);
      this.data = data;
      console.log(this.namedMonths);
      let arr = [];

      this.monthsBetween(this.data.from_date, this.data.to_date, function (month) { arr.push(this.namedMonths[month]); });
    });

  }
  onItemSelect1(item: any) {
    console.log('onItemSelect', item);
  }
  toggleCloseDropdownSelection() {
    this.closeDropdownSelection = !this.closeDropdownSelection;
    this.dropdownSettings1 = Object.assign({}, this.dropdownSettings1, { closeDropDownOnSelection: this.closeDropdownSelection });
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



  public getJSON(): Observable<any> {
    return this.http.get("./assets/data.json");
  }

  getData() {
    this.getJSON().subscribe(data => {
      console.log(data);
      data = data.dimensions;
      console.log(data.dimensions);
    });
  }

  dateRange(startDate, endDate) {
    var start = startDate.split('-');
    var end = endDate.split('-');
    var startYear = parseInt(start[0]);
    var endYear = parseInt(end[0]);
    var dates = [];

    for (var i = startYear; i <= endYear; i++) {
      var endMonth = i != endYear ? 11 : parseInt(end[1]) - 1;
      var startMon = i === startYear ? parseInt(start[1]) - 1 : 0;
      for (var j = startMon; j <= endMonth; j = j > 12 ? j % 12 || 11 : j + 1) {
        var month = j + 1;
        var displayMonth = month < 10 ? '0' + month : month;
        dates.push([i, displayMonth, '01'].join('-'));
      }
    }
    return dates;
  }


  stringToDate(datestring) {
    var d = new Date(0);
    d.setHours(2);
    d.setFullYear(parseInt(datestring.substr(0, 4), 10));
    d.setMonth(parseInt(datestring.substr(5, 2), 10));
    d.setDate(parseInt(datestring.substr(8, 2), 10));
    return d;
  }

  monthsBetween(from, to, cb) {
    if (cb === void 0) {
      cb = function (month) { };
    }
    //Convert to date objects
    var d1 = this.stringToDate(from);
    var d2 = this.stringToDate(to);
    //month counter
    var months = 0;
    //Call callback function with month
    cb(d1.getMonth());
    //While year or month mismatch, reduce by one day
    while (d2.getFullYear() != d1.getFullYear() || d2.getMonth() != d1.getMonth()) {
      var oldmonth = d1.getMonth();
      d1 = new Date(d1.getTime() + 86400000);
      //if we enter into new month, add to month counter
      if (oldmonth != d1.getMonth()) {
        //Call callback function with month
        cb(d1.getMonth());
        months++;
      }
    }
    //return month counter as result
    return months;
  }

}
