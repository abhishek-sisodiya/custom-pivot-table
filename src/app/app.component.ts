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
  x; y; n; q; op = []; res;
  showBar = false;
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  bufferValue = 75;
  showPre = false;
  dropdownList = [];
  selectedItems = [];
  selectedItemsForDimensions = [];
  dropdownSettings = {};
  dropdownSettingss = {};
  from: string;
  to: string;
  cities = [];
  selectedItem1 = [];
  dropdownSettings1 = {};
  closeDropdownSelection = false;
  disabled = false;
  data;
  objectKeys = Object.keys;
  colsToShow = [];

  activeCustomers =
    [
      {
        "text": "Store",
        "val": "DimStore[StoreName]"
      },
      {
        "text": "Category",
        "val": "DimCategory[CategoryName]"
      },
      {
        "text": "Department",
        "val": "DimDept[DeptCode]"
      },
      {
        "text": "Customer",
        "val": "DimCustomer[CustName]"
      }
    ];
  namedMonths = ["February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", "January"];
  inactiveCustomers = [];
  formdata: FormGroup;


  ngOnInit() {
    this.dropdownList = [
      {
        "text": "Sold Qty",
        "val": "[SumOfSoldQty]"
      },
      {
        "text": "Ext Sold Price",
        "val": "[SumOfExtSoldPrice]"
      },
      {
        "text": "Ext Cost",
        "val": "[SumOfExtendedCost]"
      }
    ];
    this.selectedItems = [
      // { item_id: 3, item_text: 'Pune' },
      // { item_id: 4, item_text: 'Navsari' }
    ];
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'val',
      textField: 'text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.dropdownSettingss = {
      singleSelection: false,
      idField: 'val',
      textField: 'text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.cities = ['Year', 'Month', 'Quarter', 'Week'];
    this.selectedItem1 = [];
    this.dropdownSettings1 = {
      singleSelection: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      closeDropDownOnSelection: this.closeDropdownSelection
    };
    this.formdata = new FormGroup({
      from: new FormControl("2017-01-01"),
      to: new FormControl("2019-12-31")
    });


  }
  onItemSelect1(item: any) {
  }
  toggleCloseDropdownSelection() {
    this.closeDropdownSelection = !this.closeDropdownSelection;
    this.dropdownSettings1 = Object.assign({}, this.dropdownSettings1, { closeDropDownOnSelection: this.closeDropdownSelection });
  }
  onItemSelect() {
  }
  onSelectAll(items: any) {
  }
  onItemDeSelect() {
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
    if (this.selectedItemsForDimensions[0].val) {
      this.selectedItemsForDimensions.forEach((x, i) => {
        this.selectedItemsForDimensions[i] = x.val;
      });
    }
    return this.http.get('http://odaapi.rw.diasparkonline.com/byinterval?from_date=' + this.formdata.value.from + '&to_date=' + this.formdata.value.to + '&interval=DimDate[' + this.selectedItem1 + ']&dimensions=' + this.selectedItemsForDimensions.toString() + '&measures=' + this.selectedItems[0].val);
    // return this.http.get('./assets/data.json');
  }

  getData() {
    this.getJSON().subscribe(data => {
      data = data;
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


  ok() {
    this.showBar = !this.showBar;
    this.getJSON().subscribe(data => {
      this.showBar = !this.showBar;
      this.data = data;
      // this.data.dimensions.sort(function (a, b) {
      //   if (a < b) { return -1; }
      //   if (a > b) { return 1; }
      //   return 0;
      // })
      // this.data.available_dimensions.sort(function (a, b) {
      //   if (a.val < b.val) { return -1; }
      //   if (a.val > b.val) { return 1; }
      //   return 0;
      // })
      // // this.data.available_dimensions.sort((n1, n2) => n1 - n2);
      // // this.data.dimensions.sort((n1, n2) => n1 - n2);
      // console.log(this.data);
      // let arr = [];
      // this.monthsBetween(this.data.from_date, this.data.to_date, function (month) { arr.push(this.namedMonths[month]); });
    });
  }

  find() {
    const p = [];
    let count = 0;
    this.op = [];
    // while (this.x > 0) {
    if (this.n % 2 == 0) {
      this.res = this.n / 2;
    } else {
      for (let i = 0; i < this.n; i++) {
        if (i % 2 == 0) {
          (this.y == 1) ? p[i] = 2 : p[i] = 1;
        } else {
          p[i] = this.y;
        }
      }
      p.forEach(item => {
        if (this.q == item) {
          count++;
        }
      });
      this.op.push(p);
      this.res = count;
    }
    // }
  }

}
