import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-prospect2',
  templateUrl: './prospect2.component.html',
  styleUrls: ['./prospect2.component.scss']
})
export class Prospect2Component implements OnInit {

  @Output() selectionChanges = new EventEmitter<any>();
  @Input() step1Model: number = 1;
  @Input() step2Model: number = 1;
  
  step2Selection : any = {
    selection1: [
      {
        label: 'Primary Email Address',
        desc: 'Primary Email Address that doesn’t exist in Lead Database will be added as new leads; Primary Email Addresses that exist will be ignored.'
      },
      {
        label: 'Work Phone number',
        desc: 'Work Phone number that doesn’t exist in Lead Database will be added as new leads; Work Phone numbers that exist will be ignored.'
      },
      {
        label: 'Mobile Phone number',
        desc: 'Mobile Phone number that doesn’t exist in Lead Database will be added as new leads; Mobile Phone numbers that exist will be ignored.'
      }
    ],
    selection2: [
      {
        label: 'Primary Email Address',
        desc: 'Primary Email Address that doesn’t exist in Lead Database will be added as new leads; New records of Primary Email Addresses that exist will be added. No overwriting of old records.'
      },
      {
        label: 'Work Phone number',
        desc: 'Work Phone number that doesn’t exist in Lead Database will be added as new leads; New records of Work Phone numbers  that exist will be added. No overwriting of old records.'
      },
      {
        label: 'Mobile Phone number',
        desc: 'Mobile Phone number that doesn’t exist in Lead Database will be added as new leads; New records of Mobile Phone numbers that exist will be added. No overwriting of old records.'
      },
      {
        label: 'AloreID',
        desc: 'AloreIDs  that doesn’t exist in Lead Database or Leads with No Alore ID will be added as new leads; New records of AloreIDs that exist will be added. No overwriting of old records.'
      }
    ],
    selection3: [
      {
        label: 'Primary Email Address',
        desc: 'Primary Email Addresses that doesn’t exist in Lead Database will be added as new leads; Records of Primary Email Addresses that exist will be overwritten with new data uploaded. '
      },
      {
        label: 'Work Phone number',
        desc: 'Work Phone numbers that doesn’t exist in Lead Database will be added as new leads; Records of Work Phone Numbers that exist will be overwritten with new data uploaded.'
      },
      {
        label: 'Mobile Phone number',
        desc: 'Mobile Phone numbers that doesn’t exist in Lead Database will be added as new leads; Records of Mobile Phone Numbers that exist will be overwritten with new data uploaded.'
      },
      {
        label: 'AloreID',
        desc: 'AloreID  that doesn’t exist in Lead Database or Leads with No Alore ID will be added as new leads; Records of AloreIDs that exist will be overwritten with new data uploaded.'
      }
    ],
    selection4: [
      {
        label: 'Primary Email Address',
        desc: 'Records of Primary Email Addresses that exist will be overwritten with new data uploaded.'
      },
      {
        label: 'Work Phone number',
        desc: 'Records of Work Phone Numbers that exist will be overwritten with new data uploaded.'
      },
      {
        label: 'Mobile Phone number',
        desc: 'Records of Mobile Phone Numbers that exist will be overwritten with new data uploaded.'
      },
      {
        label: 'AloreID',
        desc: 'Records of AloreIDs that exist will be overwritten with new data uploaded.'
      }
    ]
  }

  constructor() { }

  ngOnInit(): void {
  }

  valueChanges() {
    this.selectionChanges.emit(this.step2Model)
  }

}
