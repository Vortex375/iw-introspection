import { Component, OnInit, Input, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import { DeepstreamService } from '../deepstream.service';

import * as path from 'path-browserify';
import { DeepstreamClient } from '@deepstream/client';
import { Record } from '@deepstream/client/dist/src/record/record';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { EditRecordComponent } from '../edit-record/edit-record.component';

@Component({
  selector: 'app-record-view',
  templateUrl: './record-view.component.html',
  styleUrls: ['./record-view.component.css']
})
export class RecordViewComponent implements OnInit, OnDestroy {

  private readonly ds: DeepstreamClient;

  @Input() recordName: string;

  basename: string;
  content: string;

  @ViewChild('deleteRecordTemplate') deleteRecordTemplate: TemplateRef<any>;

  private record: Record;

  constructor(private dsService: DeepstreamService,
              private bottomSheet: MatBottomSheet) {
    this.ds = dsService.getDeepstream();
  }

  ngOnInit() {
    if (this.recordName.startsWith('iw-introspection/records/')) {
      this.recordName = this.recordName.substring('iw-introspection/records/'.length);
    }
    this.basename = path.basename(this.recordName);

    this.record = this.ds.record.getRecord(this.recordName);
    this.record.subscribe(undefined, (data) => this.update(data), true);
  }

  ngOnDestroy() {
    if (this.record) {
      this.record.discard();
      this.record = undefined;
    }
  }

  editRecord() {
    this.bottomSheet.open(EditRecordComponent, {
      data: { recordName: this.recordName },
      hasBackdrop: true,
    });
  }

  deleteRecord() {
    this.bottomSheet.open(this.deleteRecordTemplate, {
      hasBackdrop: true
    });
  }

  deleteRecordYes() {
    this.record.delete();
    this.bottomSheet.dismiss();
  }

  deleteRecordNo() {
    this.bottomSheet.dismiss();
  }

  private update(data) {
    this.content = JSON.stringify(data, undefined, 2);
  }
}
