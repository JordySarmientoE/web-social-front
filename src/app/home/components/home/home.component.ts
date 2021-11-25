import {
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../interfaces/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs/operators';
import { PublicationService } from '../../../services/publication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  @ViewChild('fileInput', {static: false})
  InputVar!: ElementRef;

  selectedFile!: File;

  user!: User;
  miFormulario: FormGroup = this.fb.group({
    text: ['', [Validators.required]],
  });

  url: any;

  fileStatus = false;

  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private _ngZone: NgZone,
    private publicationService: PublicationService
  ) {}

  ngOnInit(): void {
    this.user = this.userService.usuario;
  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable
      .pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];

    if(this.selectedFile){
      this.fileStatus = true;
    }

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
      this.url = reader.result;
    };
  }

  publicate() {
    const text = this.miFormulario.controls.text?.value;
    this.publicationService.addPublication(text).subscribe(
      (res) => {
        const publication: any = res;

        if (this.selectedFile && this.fileStatus === true) {
          const uploadData = new FormData();
          uploadData.append('image', this.selectedFile, this.selectedFile.name);
          this.publicationService
            .makeFileRequest(uploadData, publication._id)
            .subscribe((data) => {
              this.InputVar.nativeElement.value = "";
              this.fileStatus = false;
            });
        }

        Swal.fire({
          icon: 'success',
          text: `Publicación realizada!`,
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
          }
        });

        this.miFormulario.reset();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
