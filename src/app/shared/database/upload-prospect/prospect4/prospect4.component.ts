import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ProspectService } from 'src/app/service/resource/prospect.service';

@Component({
  selector: 'app-prospect4',
  templateUrl: './prospect4.component.html',
  styleUrls: [
    './prospect4.component.scss',
    '../../../../../assets/style/form-field.scss',
  ]
})
export class Prospect4Component implements OnInit {

  @Input() csvColumn: string[] = [];
  @Input() tempFormValue: any = null;
  @Input() csvId: string = '';
  @Input() step2Model: number = 0;
  @Output() formChanged = new EventEmitter<any>();
  @Output() formValue = new EventEmitter<any>();

  formControl = this.fb.group({});
  attributeData: string[] = [];
  requiredField: string[] = [];

  constructor(
    private prospectService: ProspectService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.getProspectAttribute()

    this.formControl.valueChanges.subscribe((value : any) => {
      this.formValue.emit(value)
      this.formChanged.emit(this.formControl.valid && this.getFormControlValue?.length >= 1 ? true : false)
    })
  }

  getSuggestion() {
    this.prospectService.getSuggestion(this.csvId)
    .subscribe((resp : any) => {
      Object.keys(resp.object).forEach((value : string) => {
        const attributeName = this.camelToUnderscore(value)
        if (attributeName !== 'campaign_Id') {
          this.formControl.controls[attributeName].setValue(
            resp.object[value]
          )
        }
      })
    })
  }

  clearSpecificProspectInput(event: any){
    this.formControl.get(event)?.setValue("");
    
   
  }

  getProspectAttribute() {
    this.prospectService.getProspectDatabaseAttribute().subscribe((resp: any) => {
      if (resp.responseCodeJson.code === 200) {
        const requiredField : string[] = [
          'firstName',
          'lastName'
        ]
        switch (this.step2Model) {
          case 1:
            requiredField.push('email')
            break;
          case 2:
            requiredField.push('workPhone')
            break;
          case 3:
            requiredField.push('phone')
            break;
        
          default:
            break;
        }
        this.requiredField = requiredField
        resp.list.forEach((value: string) => {
          const attributeName = this.camelToUnderscore(value)
          if (attributeName !== 'campaign_Id') {
            if (requiredField.includes(value)) {
              this.formControl.addControl(
                attributeName,
                new FormControl(null, Validators.required)
              );
            } else {
              this.formControl.addControl(
                attributeName,
                new FormControl(null)
              );
            }
            this.attributeData.push(attributeName)
          }
        })

        if (this.tempFormValue) {
          this.formControl.patchValue(
            this.tempFormValue
          )
        } else {
          this.getSuggestion()
        }
      }
    })
  }

  camelToUnderscore(key : string) : string {
    var result = key.replace(/([A-Z])/g, " $1");
    return result.split(' ').join('_');
  }
 
  replaceUnderscore(key : string) : string {
    return key.replace(/_/g, ' ')
  }

  isMandatoryField(fieldName : string) {
    const filteredField = this.requiredField.filter((value : string) => {
      return value.toLocaleLowerCase() === fieldName.replace(/_/g, '').toLocaleLowerCase();
    })
    if (filteredField.length) {
      return '*'
    } else {
      return ''
    }
  }

  get getFormControlValue() : string[] {
    const formValue = this.formControl.value
    let selectedOption : string[] = []
    Object.keys(formValue).forEach((value : string) => {
      if (formValue[value]) {
        selectedOption.push(formValue[value])
      }
    })
    return selectedOption
  }
}
