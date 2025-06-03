import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmailEditorService } from 'src/app/service/resource/email-editor.service';

@Component({
  selector: 'app-email-editor-change-color',
  templateUrl: './email-editor-change-color.component.html',
  styleUrls: [
    './email-editor-change-color.component.scss',
    '../../../../assets/style/default-modal-style.scss'
  ]
})
export class EmailEditorChangeColorComponent implements OnInit {

  loader : boolean = false
  selectedColor : string = 'CFDFFF';
  colorList = [
    '#CFDFFF', '#D0F0FD', '#C2F5E9', '#FFB2C8', '#FFE3AF', '#FF9FF2', '#FFB598', '#AFB5FF', '#83CC8B', '#EEEEEE',
    '#9CC7FF', '#77D1F3', '#72DDC3', '#FF8CAD', '#FFD68C', '#FE67E9', '#FF9E79', '#8E96FF', '#61C76C', '#CCCCCC',
    '#2D7FF9', '#18BFFF', '#20D9D2', '#FF4E81', '#FFC55C', '#F638DC', '#FF7844', '#6B76FF', '#20C933', '#ACACAC',
    '#0067FF', '#4083AC', '#7BC8C3', '#FF0049', '#FDB22B', '#FF00DC', '#FF4700', '#3140FF', '#00B514', '#666666',
    '#0054D1', '#0B76B7', '#06A09B', '#DA0240', '#E89500', '#D600B8', '#C53700', '#0013FF', '#338A17', '#444444'
  ]
  customColor : any[] = [];
  customColorLoader : boolean = false;
  customColorLoaderItem : number[] = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10
  ]


  constructor(
    public dialogRef : MatDialogRef<EmailEditorChangeColorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private emailEditorService : EmailEditorService
  ) {
  }

  ngOnInit(): void {
    this.getColorList()
  }

  deleteColor(colorId : string) {
    this.emailEditorService.deleteColor(colorId).subscribe(
      (resp : any) => {
        if (resp.responseCodeJson.code === 200){
          this.customColor = this.customColor.filter((obj : any) => {
            return obj.colorSettingsId !== colorId
          })
        }
      }
    )
  }

  changeColor(color : string) {
    this.selectedColor = color.replace('#', '')
  }

  addColor() {
    this.loader = true
    this.emailEditorService.createColor('#' + this.selectedColor).subscribe(
      (resp) => {
        this.loader = false
        this.applyColor()
      }
    )
  }

  getColorList() {
    this.customColorLoader = true
    this.emailEditorService.getColorList().subscribe(
      (resp : any) => {
        this.customColorLoader = false
        if (resp.responseCodeJson.code === 200){
          this.customColor = resp.list
        }
      }
    )
  }

  isHexColor (hex : string) {
    return typeof hex === 'string'
        && hex.length === 6
        && !isNaN(Number('0x' + hex))
  }

  applyColor() {
    this.dialogRef.close(this.selectedColor)
  }

}
