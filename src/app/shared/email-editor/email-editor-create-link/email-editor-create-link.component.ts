import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-email-editor-create-link',
  templateUrl: './email-editor-create-link.component.html',
  styleUrls: [
    './email-editor-create-link.component.scss',
    '../../../../assets/style/default-modal-style.scss'
  ]
})
export class EmailEditorCreateLinkComponent implements OnInit {


  formControl = this.fb.group({
    url: [null, Validators.required],
    text: [null, Validators.required],
  });

  constructor(
    public dialogRef : MatDialogRef<EmailEditorCreateLinkComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    // check it theres selected text exist
    if (this.data?.selectedText) {
      const textControl = this.formControl.controls['text']
      textControl.setValue(this.data?.selectedText)
      textControl.markAsTouched()
    }

    // validate url control
    const urlControl = this.formControl.controls['url']
    urlControl.valueChanges.subscribe((value : string) => {
      const splittedValue = value.split('.')
      if(
        !value.includes('.') ||
        splittedValue[0].length < 1 ||
        splittedValue[1].length < 1 ||
        splittedValue.length <= 1
      ) {
        // domain must include '.'
        urlControl.setErrors({
          dotError : true
        })
      } else if (value.includes('@')) {
        // domain cannot include '@'
        urlControl.setErrors({
          atError : true
        })
      }
    })
  }

  getControlValidation(controlName : string) {
    return this.formControl.get(controlName)
  }

  save() {
    this.dialogRef.close(
      this.formControl.value
    )
  }

}
