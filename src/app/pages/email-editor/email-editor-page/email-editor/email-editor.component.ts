import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2, SimpleChanges, ViewChild, SimpleChange } from '@angular/core';
import { IAtttachmentData, ICreateLink } from 'src/app/model/email-editor';
import { EmailEditorService } from 'src/app/service/resource/email-editor.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import Tribute from 'tributejs';
import { FormControl } from '@angular/forms';
import { FaqService } from 'src/app/service/resource/faq.service';
import { ScoreService } from 'src/app/service/resource/score.service';
import { LayoutService } from 'src/app/service/core/layout.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SideMenuTreeService } from 'src/app/service/core/side-menu-tree.service';
import { campaignList } from '../../../../model/tree-sidebar';
import { PromptService } from '../../../../service/resource/prompt.service';
import { RepliesThreadComponent } from '../../../campaign-item-detail/campaign-item-tabs/replies-thread/replies-thread.component';

@Component({
  selector: 'app-email-editor',
  templateUrl: './email-editor.component.html',
  styleUrls: ['./email-editor.component.scss']
})
export class EmailEditorComponent implements OnInit {

  @Output() updatedHtml = new EventEmitter<any>();
  @Output() refreshBaseCampaign = new EventEmitter<boolean>(false);
  @Output() isDataSaved = new EventEmitter<any>();
  @Output() subject = new EventEmitter<any>();
  @Output() body = new EventEmitter<any>();
  @Output() updatePersonalizedEmail = new EventEmitter<any>();
  @Output() lastSaveDate = new EventEmitter<any>();

  @Input() isDataSavedParent: boolean = false;
  @Input() isHelperTextShown: boolean = false;
  @ViewChild('froalaEditorContainer') froalaEditorContainer!: ElementRef;
  @ViewChild('changeColorEelement') changeColorEelement!: ElementRef;
  @ViewChild('changeBackgroundColorEelement') changeBackgroundColorEelement!: ElementRef;
  @ViewChild('uploadImage') uploadImage!: ElementRef;
  @ViewChild('uploadAttachment') uploadAttachment!: ElementRef;
  @ViewChild('createLink') createLink!: ElementRef;
  @ViewChild('updateText') updateText!: ElementRef;


  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.windowWidth = window.innerWidth;
  }

  emailSubjectControl = new FormControl('');
  emailBodyControl = new FormControl('');
  personalizedEmailId: string = '';
  campaignId: string = ''
  emailBody: string = '';
  emailSubject: string = '';


  loader: boolean = false;
  fullTextEditing: boolean = true;
  activeTab: string = 'edit'
  tabs: string[] = [
    'edit',
    'view'
  ]
  attachmentList: any[] = [];
  previewData: any = ''
  dummyBody: string = ''
  inputElement: any = ''
  inputText = new BehaviorSubject<any>('');
  personalizedField: any[] = []

  // froala variable
  FroalaEditor = require('froala-editor');
  emailEditorModel: string = '';
  tempHtml: string = ''
  editor: any;
  windowWidth: number = 0;
  isRecomendationShown: boolean = false;
  isFirstLoad: boolean = true;

  selectedText: string = '';
  // pastePlain: true,
  // pasteDeniedAttrs: ['id','style'],
  // allowedAttrs :['a','src','href'],
  // enter: this.FroalaEditor.ENTER_BR,
  froalaOptions: any = {

    toolbarButtons: [],
    pastePlain: true,
    pasteDeniedAttrs: ['id', 'style'],
    allowedAttrs: ['a', 'src', 'href'],
    dragInline: true,
    toolbarSticky: false,
    placeholderText: 'Hey, there {{firstName}} Enter email body here...',
    key: 'AVB8B-21B2A1F3E1F2F1ua2BD1IMNBUMRWAd1AYMSTRBUZYA-9H3E2J2C4C6C3C1B5B1C1==',
    quickInsertTags: [],
    imageInsertButtons: ['imageBack', '|', 'imageByURL'],
    enter: this.FroalaEditor.ENTER_BR,
    paragraphFormatSelection: true,
    formEditButtons: [],
    fontFamily: {},
    fontFamilySelection: true,
    imageUpload: true,
    fileMaxSize: 1024 * 1024 * 10,
    fileAllowedTypes: ['*'],
    imageEditButtons: ['imageDisplay', 'imageAlign', 'imageInfo', 'imageRemove'],
    imageUploadMethod: 'POST',
    imageUploadRemoteUrls: true,
    imageAllowedTypes: ['jpeg', 'jpg', 'png'],
    wordAllowedStyleProps: ['font-family', 'background', 'color', 'text-align', 'vertical-align', 'background-color', 'height', 'text-decoration', 'font-weight', 'font-style', 'text-indent', 'border', 'border-.*'],

    events: {

      contentChanged: () => {
        const data = this.editor.html.get();
      },

      'keyup': (input: any) => {
        this.updateText.nativeElement.click();
      },
      'save.before': () => {
        this.updatePersonalizedEmail.emit()
      },
      'save.after': () => {
        this.updatePersonalizedEmail.emit()
      },

      click: (input: any) => {
        if (
          input.currentTarget.className === "froala-textbox" ||
          input.currentTarget.className === "froala-textbox number"
        ) {
          this.inputElement = input
          this.updateText.nativeElement.click();
        } else {
          this.inputElement = ''
        }
      },
      'initialized': (event: any) => {

        // initialziing personalizationfield
        const tributeJsOptions = new Tribute({
          trigger: "{",
          values: this.personalizedField,
          selectTemplate: function (item) {
            return "{{" + item.original.key + "}}";
          },
          positionMenu: true,
        })

        tributeJsOptions.attach(this.editor.el);

        this.editor.events.on('keydown', (e: any) => {
          if (tributeJsOptions.isActive) {
            return false;
          } else {
            return true
          }
        }, true)
      }
    }
  };
  toolBoxes: string[] = [
    'paragraphFormat',
    '|',
    'bold',
    'italic',
    'underline',
    'strikeThrough',
    'clearFormatting',
    'fontSize',
    'html',
    '|',
    'alignLeft',
    'alignCenter',
    'alignRight',
    'alignJustify',
    '|',
    'formatOL',
    'formatUL',
    '|',
    'customTextColor', // custom
    'customBackgroundColor', // custom
    '|',
    'insertImage', // custom
    'addAttachment', // custom
    'addLink', // custom
    '|',
    'indent',
    'outdent',
    'quote',
    'undo',
    'redo',

  ];

  constructor(
    private emailEditorService: EmailEditorService,
    protected sanitizer: DomSanitizer,
    private faqService: FaqService,
    private score: ScoreService,
    public layoutService: LayoutService,
    private router: Router,
    private sideMenuService: SideMenuTreeService,
    private activatedRoute: ActivatedRoute,
    private promptService: PromptService
  ) {
    this.windowWidth = window.innerWidth;
  }

  ngOnInit(): void {
    this.promptService.$email.subscribe((resp) => {
      
      resp = resp.replace(/(\r\n|\r|\n)/g, '<br>')
      this.editor.html.set(resp);
      this.emailBodyControl.setValue(resp);
      this.emailBody = resp;
      this.body.emit(resp);
      
    })
    this.faqService.setPageNumber(8);
    this.froalaOptions.toolbarButtons = this.toolBoxes
    this.emailEditorModel = this.emailBody;
    this.campaignId = this.activatedRoute.snapshot.paramMap.get('campaignId') || '';

    this.sideMenuService.currentSelectedEmail.subscribe((value: any) => {

      if (this.isDataSavedParent) {

        if (value.body == null)
          value.body = '';


        const body1 = value.body.replace(/{{/g, '<span class="froala-textbox">')
        let body2 = body1.replace(/}}/g, '​</span>')

        // this.emailBodyControl.setValue(value.body);

        this.emailBody = value.body
        this.emailSubject = value.subject

        //This may be needed to be uncommented or used in other way later

        this.subject.emit(value.subject)
        this.body.emit(value.body)

        this.personalizedEmailId = value.personalizedEmailId
        this.updateSubjectParameter(value.subject)
        this.updateEmailBodyParameter(value.body)

        if (this.editor) {
          this.editor.html.set(value.body);
        }

        this.getAttachmentList()
        this.isFirstLoad = true
        this.emailSubjectControl.setValue(value.subject);

        setTimeout(() => {
          this.emailBodyControl.setValue(value.body);
        }, 400)

      }
    })

    this.emailSubjectControl.valueChanges.subscribe((value: string) => {
      this.updateTextDesc(this.isFirstLoad)
      this.updateSubjectParameter(value)
    })

    this.emailBodyControl.valueChanges.subscribe((value: string) => {
      this.updateTextDesc(this.isFirstLoad)
    })

    this.getPersonalizedField()
    this.getAttachmentList()
  }




  getAttachmentList() {
    const campaignId: string = this.router.url.split('/')[4]
    this.emailEditorService.getAttachment(
      campaignId,
      this.personalizedEmailId
    ).subscribe((resp: any) => {

      if (resp.responseCodeJson.code === 200) {
        this.attachmentList = resp.list;
        this.lastSaveDate.emit(resp.object);
      }
    })
  }

  getPersonalizedField() {
    this.loader = true
    this.emailEditorService.getPersonalizedFIeld().subscribe(
      (resp: any) => {
        if (resp.responseCodeJson.code === 200) {
          this.loader = false
          let personalizedField: any[] = []
          resp.list.forEach((obj: any) => {
            const textBox = '<span class="froala-textbox">' + obj.fieldName + '​</span>'
            if (this.emailBody.includes(textBox)) {
              var re = new RegExp(textBox, 'g');
              this.emailBody = this.emailBody.replace(re, `{<span class="personalized-field">{${obj.fieldName}}</span>}`) // and this was for end bracket }}
            }
            personalizedField.push({
              key: obj.fieldName,
              value: `<span class="personalized-field">{${obj.fieldName}}</span>}`,
            })
          })
          this.personalizedField = personalizedField
          setTimeout(() => {
            const subjectTribute = new Tribute({
              trigger: "{",
              values: resp.list.map((obj: any) => {
                return {
                  key: obj.fieldName,
                  value: '{' + obj.fieldName + '}}',
                }
              }),
              positionMenu: true
            })
            const subjectElement: any = document.getElementById("email_subject")
            subjectTribute.attach(subjectElement);
          }, 10);
        }

        setTimeout(() => {
          this.editor.html.set(this.emailBody)
        }, 10);
        this.emailSubjectControl.setValue(this.emailSubject)
      }
    )
  }

  updateTextDesc(isFirstLoad: boolean) {
    if (!isFirstLoad) {
      this.isDataSaved.emit(false)
    }
    this.isFirstLoad = false
    // editorValue: this.editor?.html?.get(),
    this.updatedHtml.emit({

      // editorValue: this.editor?.html?.get(),
      editorValue: this.emailBodyControl.value,
      subject: this.emailSubjectControl.value
    });

    if (this.editor?.html?.get()) {
      // this.editor?.html?.get()
      this.updateEmailBodyParameter(this.emailBodyControl.value)

    }

    if (this.inputElement) {
      const outerHtml: string = this.inputElement.currentTarget.outerHTML
      const innerText = this.inputElement.currentTarget.innerText

      // validate if input field was empty
      if (
        outerHtml == '<span class="froala-textbox">​</span>' ||
        outerHtml == '<span class="froala-textbox number">​</span>'
      ) {
        this.inputElement.currentTarget.classList.add("invalid")
      } else {
        this.inputElement.currentTarget.classList.remove("invalid")
      }

      // validate number innput only
      if (this.inputElement.currentTarget.className.includes('number')) {
        if (isNaN(Number(innerText))) {
          this.inputElement.currentTarget.textContent = innerText.replace(/[^0-9,.]+/g, "")
        } else {
          this.inputText.next(innerText)
        }
      } else {
        this.inputText.next(innerText)
      }
    }
    // this.score.setEmailBody(this.editor?.html?.get());
  }

  initializeFroala(event: any) {
    event.initialize()
    this.editor = event.getEditor()
    this.initializeToolbar(event.getEditor())
  }

  initializeToolbar(editor: any) {
    this.toolBoxes.forEach((value: string, i: number) => {
      // defining icon
      const template: string = value != 'paragraphFormat' ?
        `<svg ${'#' + value}><use xlink:href="#${value}" /></svg>` :
        '<div class="paragraph-button">Paragraph</div>'
      this.FroalaEditor.DefineIconTemplate(value,
        template
      )
      this.FroalaEditor.DefineIcon(value, { NAME: value, template: value })

      // assingning toolbar functionalities
      switch (value) {
        case 'insertImage':
          this.FroalaEditor.RegisterCommand(value, {
            title: 'Insert an image',
            icon: value,
            callback: () => {
              this.uploadImage.nativeElement.click();
            }
          });
          break;
        case 'addAttachment':
          this.FroalaEditor.RegisterCommand(value, {
            title: 'Add Attachment',
            icon: value,
            callback: () => {
              this.uploadAttachment.nativeElement.click();
            }
          });
          break;
        case 'addLink':
          this.FroalaEditor.RegisterCommand(value, {
            title: 'Add Link',
            icon: value,
            callback: () => {
              this.selectedText = editor.selection.text()
              this.createLink.nativeElement.click();
            }
          });
          break;
        case 'customBackgroundColor':
          this.FroalaEditor.RegisterCommand(value, {
            title: 'Background Color',
            icon: value,
            callback: () => {
              this.changeBackgroundColorEelement.nativeElement.click();
            }
          });
          break;
        case 'customTextColor':
          this.FroalaEditor.RegisterCommand(value, {
            title: 'Text Color',
            icon: value,
            callback: () => {
              this.changeColorEelement.nativeElement.click();
            }
          });
          break;
        case 'quote':
          this.FroalaEditor.RegisterCommand(value, {
            title: 'Add Quote',
            icon: value,
            callback: () => {
              editor.quote.apply('increase');
            }
          });
          break;

        default:
          break;
      }
    })
  }

  removeAttachment(attachmentId: string) {
    const campaignId: string = this.router.url.split('/')[4]
    this.emailEditorService.removeAttachment(
      campaignId,
      this.personalizedEmailId,
      attachmentId
    ).subscribe((resp: any) => {
      if (resp.responseCodeJson.code === 200) {
        this.getAttachmentList()
      }
    })
  }

  changeTab(tabName: string) {
    if (tabName !== this.activeTab) {
      if (tabName === 'view') {
        const html = this.sanitizer.bypassSecurityTrustHtml(this.editor.html.get());
        this.previewData = html

      }
      this.activeTab = tabName

    } else if (tabName === 'edit') {
      let data = this.editor.html.set(this.previewData);
  
    }
  }

  insertLink() {
    this.editor.selection.save()

    // toggling dialog
    this.editor.edit.off()
    const dialog = this.emailEditorService.createLinkDialog(this.selectedText)
    setTimeout(() => {
      this.editor.edit.on()
    }, 10);

    // dialog action after closed
    dialog.afterClosed().subscribe((result: ICreateLink) => {
      this.editor.selection.restore()
      this.editor.events.focus()

      // inserting link to froala
      if (result) {
        this.editor.link.insert(
          result.url,
          this.selectedText || this.selectedText === result.text ? this.editor.link.allSelected() : result.text,
          { 'target': '_blank', 'rel': 'nofollow' }
        );
      }
      this.selectedText = ''
    })
  }

  changeColor(type: string) {
    this.editor.selection.save()

    // toggling dialog
    this.editor.edit.off()
    const dialog = this.emailEditorService.colorPickerDialog('', type)
    setTimeout(() => {
      this.editor.edit.on()
    }, 10);

    // dialog action after closed
    dialog.afterClosed().subscribe((value: string) => {
      this.editor.selection.restore()
      this.editor.events.focus()
      if (type === 'Font') {
        // set font color
        this.editor.colors.text(value);
      } else {
        // set background color
        this.editor.colors.background(value);
      }
    })
  }

  uploadFile(type: string) {
    this.editor.selection.save()
    let fileType: string[] = []
    let uploadType: string = ''
    if (type === 'attachment') {
      uploadType = 'attachment'
      fileType = [
        'pdf', 'xls', 'docx', 'jpg', 'jpeg', 'txt', 'png', 'csv'
      ]
    } else {
      uploadType = 'insert'
      fileType = [
        'jpg', 'jpeg', 'png'
      ]
    }

    // toggling dialog
    this.editor.edit.off()
    const dialog = this.emailEditorService.fileUploadDialog(fileType, uploadType, this.personalizedEmailId)
    setTimeout(() => {
      this.editor.edit.on()
    }, 10);

    dialog.afterClosed().subscribe((result: any) => {
      this.editor.selection.restore()
      this.editor.events.focus()
      if (type === 'image' && result) {
        // inserting image to froala

        this.emailEditorService.uploadAttachment(this.campaignId, this.personalizedEmailId, result)
          .subscribe((resp: any) => {
            if (resp.link) {
              this.editor.image.insert(resp.link, null, null, this.editor.image.get());
            }
          })

        //   var reader = new FileReader();
        //   reader.readAsDataURL(result);
        //   reader.onload = () => {
        //     // this.editor.image.insert(reader.result, null, null, this.editor.image.get());
        //     this.editor.image.insert(reader.result, null, null, this.editor.image.get());
        //   };

      }
      if (type === 'attachment' && result) {
        // adding file to attachment list
        this.getAttachmentList()
      } else {
        // return null
      }
    })
  }

  updateEmailBodyParameter(value: string) {
    this.score.emailBody.next(value)
  }

  updateSubjectParameter(value: string) {
    var div = document.createElement("div")
    div.innerHTML = value.replace(/&nbsp/g, ' ')
    const innerText = div.textContent || div.innerText || ""
    let subjectLength: number = 0;

    if (innerText) {
      let splittedSubject = innerText.split(' ')
      subjectLength = splittedSubject.length
    }
    this.score.emailSubject.next(subjectLength)
  }

  onSubjectFocus() {
    const subjectControl = this.emailSubjectControl
    if (subjectControl.value === 'Set your subject') {

      subjectControl.setValue('')
    }
  }

  onEmailBodyFocus() {
    const mailBody = this.editor.html.get()
    if (mailBody === 'Add Body') {
      this.editor.html.set('')
    }
  }


  get isTagInvalidExist(): boolean {
    if (this.editor) {
      const editorValue = this.editor?.html?.get()
      if (editorValue?.includes('{{{') || editorValue?.includes('}}}')) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  }
}
