import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AppConfigService } from 'src/app/core/services/app-config.service';
import { RoomService } from 'src/app/core/services/room.service';
import { Snackbar } from 'src/app/core/ui/snackbar';
import { AlertDialogModel } from 'src/app/shared/alert-dialog/alert-dialog-model';
import { AlertDialogComponent } from 'src/app/shared/alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.scss']
})
export class AddRoomComponent implements OnInit {
  data: {
    roomId?: string
  }
  roomForm: FormGroup;
  conFirm = new EventEmitter();
  isProcessing = false;
  isLoading = false;
  error;
  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private roomService: RoomService,
    private snackBar: Snackbar,
    private appconfig: AppConfigService,
    public dialogRef: MatDialogRef<AddRoomComponent>
  ) {
    dialogRef.disableClose = true;
    this.roomForm = this.formBuilder.group({
        name: ['', Validators.required],
        monthlyRate: ['', Validators.required],
    });
  }
  ngOnInit(): void {

    if(!this.isNew){
      this.getData();
    }
  }

  getData(){
    try {
      this.isLoading = true;
      this.
      roomService
        .getById(this.data.roomId)
        .subscribe(
          async (res) => {
            if (res.success) {
              this.roomForm.controls["name"].setValue(res.data.name);
              this.roomForm.controls["monthlyRate"].setValue(res.data.monthlyRate);
              this.isLoading = false;
            } else {
              this.isLoading = false;
              this.error = Array.isArray(res.message)
                ? res.message[0]
                : res.message;
              this.snackBar.snackbarError(this.error);
            }
          },
          async (err) => {
            this.isLoading = false;
            this.error = Array.isArray(err.message)
              ? err.message[0]
              : err.message;
            this.snackBar.snackbarError(this.error);
          }
        );
    }catch(err){
      this.isLoading = false;
      this.error = Array.isArray(err.message)
        ? err.message[0]
        : err.message;
      this.snackBar.snackbarError(this.error);
    }
  }

  get isNew(){ return !this.data || !this.data.roomId && this.data.roomId === "" }

  get formData() {
    return this.roomForm.value;
  }

  get f() { return this.roomForm.controls; }

  onSubmit(): void {
    if (this.roomForm.valid) {
      const param = {
        roomId: this.data ? this.data.roomId : null,
        ...this.formData
      };
      const dialogData = new AlertDialogModel();
      dialogData.title = 'Confirm';
      dialogData.message = 'Save?';
      dialogData.confirmButton = {
        visible: true,
        text: 'yes',
        color: 'primary',
      };
      dialogData.dismissButton = {
        visible: true,
        text: 'cancel',
      };
      const dialogRef = this.dialog.open(AlertDialogComponent, {
        maxWidth: '400px',
        closeOnNavigation: true,
      });

      dialogRef.componentInstance.alertDialogConfig = dialogData;
      dialogRef.componentInstance.conFirm.subscribe(async (confirmed: any) => {
        if (confirmed) {
          this.isProcessing = true;
          dialogRef.componentInstance.isProcessing = this.isProcessing;
          try {
            if(this.isNew) {
              await this.
              roomService
                .add(param)
                .subscribe(
                  async (res) => {
                    if (res.success) {
                      this.conFirm.emit(true);
                      this.snackBar.snackbarSuccess("Saved!");
                      dialogRef.close();
                      this.isProcessing = false;
                      dialogRef.componentInstance.isProcessing = this.isProcessing;
                    } else {
                      this.isProcessing = false;
                      this.error = Array.isArray(res.message)
                        ? res.message[0]
                        : res.message;
                      this.snackBar.snackbarError(this.error);
                      dialogRef.componentInstance.isProcessing = this.isProcessing;
                    }
                  },
                  async (err) => {
                    this.isLoading = false;
                    this.error = Array.isArray(err.message)
                      ? err.message[0]
                      : err.message;
                    this.snackBar.snackbarError(this.error);
                    dialogRef.componentInstance.isProcessing = this.isProcessing;
                  }
                );
            }
            else {
              await this.
              roomService
                .udpdate(param)
                .subscribe(
                  async (res) => {
                    if (res.success) {
                      this.conFirm.emit(true);
                      this.snackBar.snackbarSuccess("Saved!");
                      dialogRef.close();
                      this.isProcessing = false;
                      dialogRef.componentInstance.isProcessing = this.isProcessing;
                    } else {
                      this.isProcessing = false;
                      this.error = Array.isArray(res.message)
                        ? res.message[0]
                        : res.message;
                      this.snackBar.snackbarError(this.error);
                      dialogRef.componentInstance.isProcessing = this.isProcessing;
                    }
                  },
                  async (err) => {
                    this.isLoading = false;
                    this.error = Array.isArray(err.message)
                      ? err.message[0]
                      : err.message;
                    this.snackBar.snackbarError(this.error);
                    dialogRef.componentInstance.isProcessing = this.isProcessing;
                  }
                );
            }
          } catch (e) {
            this.isLoading = false;
            this.error = Array.isArray(e.message) ? e.message[0] : e.message;
            this.snackBar.snackbarError(this.error);
            dialogRef.componentInstance.isProcessing = this.isProcessing;
          }
        }
      });
    }
  }

  getError(key:string){
    return this.f[key].errors;
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }
}
