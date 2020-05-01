import { Component, OnInit, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheet } from '@angular/material/bottom-sheet';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { DeepstreamService } from '../deepstream.service';
import { Record } from '@deepstream/client/dist/record/record';
import * as path from 'path-browserify'

export interface EditRecordData {
  recordName: string;
}

function jsonValidator(control: AbstractControl) {
  try {
    JSON.parse(control.value);
    return null;
  } catch (err) {
    return { json: err };
  }
}

@Component({
  selector: 'app-edit-record',
  templateUrl: './edit-record.component.html',
  styleUrls: ['./edit-record.component.css']
})
export class EditRecordComponent implements OnInit {

  form: FormGroup;
  basename: string;
  private record: Record;

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: EditRecordData,
              private dsService: DeepstreamService,
              private bottomSheet: MatBottomSheet,
              fb: FormBuilder) {
    this.form = fb.group({
      record: ['', jsonValidator]
    });
  }

  async ngOnInit() {
    this.basename = path.basename(this.data.recordName);
    this.record = this.dsService.getDeepstream().record.getRecord(this.data.recordName);
    await this.record.whenReady();
    this.form.setValue({ record: JSON.stringify(this.record.get(), null, 2)});
  }

  async saveRecord() {
    if (this.form.valid) {
      await this.record.setWithAck(JSON.parse(this.form.value['record']));
      this.form.markAsPristine();
    }
  }

  close() {
    this.bottomSheet.dismiss();
  }
}
