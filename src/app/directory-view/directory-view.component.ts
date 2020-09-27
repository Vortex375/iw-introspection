import { Component, OnInit, Input, Output, EventEmitter, ViewChild, TemplateRef, ElementRef } from '@angular/core';
import { DeepstreamService } from '../deepstream.service';

import * as path from 'path-browserify';
import * as _ from 'lodash';
import { DeepstreamClient } from '@deepstream/client';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

const INDEX_RECORD = '.iw-index';

@Component({
  selector: 'app-directory-view',
  templateUrl: './directory-view.component.html',
  styleUrls: ['./directory-view.component.css']
})
export class DirectoryViewComponent implements OnInit {

  private readonly ds: DeepstreamClient;

  @Output()
  openDir: EventEmitter<string> = new EventEmitter();

  @Input()
  root: string;
  subdirs = [];
  records = [];
  activeDirectory = -1;

  createRecordForm: FormGroup;
  @ViewChild('createRecordTemplate') createRecordTemplate: TemplateRef<any>;
  @ViewChild('recordNameInput') recordNameInput: ElementRef;

  constructor(private dsService: DeepstreamService, private bottomSheet: MatBottomSheet, fb: FormBuilder) {
    this.ds = dsService.getDeepstream();
    this.createRecordForm = fb.group({
      recordName: ['']
    });
  }

  ngOnInit() {
    this.ds.record.getRecord(path.join(this.root, INDEX_RECORD)).subscribe(undefined, (data) => this.update(data), true);
  }

  private update(data) {
    this.subdirs = _.filter(data, s => s.endsWith('/'));
    this.records = _.map(_.filter(data, s => ! s.endsWith('/')), s => path.join(this.root, s));
  }

  openSubdir(subdir: string, index: number) {
    this.openDir.emit(path.join(this.root, subdir));
    this.activeDirectory = index;
  }

  isRecordView() {
    return this.root?.startsWith('iw-introspection/records');
  }

  createRecord() {
    let recordName = this.root.substring('iw-introspection/records'.length);
    if ( ! recordName.endsWith('/')) {
      recordName = recordName + '/';
    }
    this.createRecordForm.setValue({
      recordName
    });
    this.bottomSheet.open(this.createRecordTemplate);
    setTimeout(() => this.recordNameInput.nativeElement.focus());
  }

  async doCreateRecord() {
    const newRecord = this.ds.record.getRecord(this.createRecordForm.controls.recordName.value);
    await newRecord.whenReady();
    newRecord.discard();
    this.bottomSheet.dismiss();
  }
}
