import { Component, OnInit, ChangeDetectorRef, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import * as _ from 'lodash';
import { SuiModule } from 'ng2-semantic-ui';
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
@Component({
  selector: 'app-custom-multi-select',
  templateUrl: './custom-multi-select.component.html',
  styleUrls: ['./custom-multi-select.component.scss']
})
export class CustomMultiSelectComponent implements OnInit {
  @Input() inputData: Array<string>;
  @Input() field: object;
  checkBox: object;
  selectAllCheckBox = false;
  refresh = true;
  placeholder = '';
  @Output() selectedValue = new EventEmitter<any>();

  constructor(private cdr: ChangeDetectorRef) { }
  checkbox(name) {
    if (this.checkBox[name]) {
      this.checkBox[name] = false;
      this.selectAllCheckBox = false;
    } else {
      this.checkBox[name] = true;
    }
  }
  selectAll(code) {
    this.placeholder = 'Selected';
    this.inputData = [];
    this.selectAllCheckBox = !this.selectAllCheckBox;
    if (this.selectAllCheckBox) {
      _.forEach(this.field['range'], (value) => {
        this.inputData.push(value.name);
        this.checkBox[value.name] = true;
      });
    } else {
      this.placeholder = '';
      this.inputData = [];
      _.forEach(this.field['range'], (value) => {
        this.checkBox[value.name] = false;
      });
    }
    this.selectedValue.emit(this.inputData);
    this.refresh = false;
    this.cdr.detectChanges();
    this.refresh = true;
  }
  selectedOption(event) {
    console.log('event select', event);
    this.placeholder = 'Selected';
    if (event.length === 0) {
      this.placeholder = '';
    }
    const fieldName = [];
    _.forEach(this.field['range'], (value, key) => {
      fieldName.push(value.name);
    });
    if (fieldName.length === event.length) {
      this.selectAllCheckBox = true;
    }
    this.selectedValue.emit(event);
  }
  ngOnInit() {
    console.log('this.inputData', this.field);
    this.checkBox = {};
    const name = [];
    if (this.inputData) {
      _.forEach(this.field['range'], (value, key) => {
        name.push(value.name);
      });
      if (name.length === this.inputData.length) {
        this.selectAllCheckBox = true;
      }
      _.forEach(this.inputData, (value) => {
        this.checkBox[value] = true;
      });
    }
  }
}
