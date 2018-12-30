import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { DeepstreamService } from '../deepstream.service';

import * as path from "path-browserify"

@Component({
  selector: 'app-record-view',
  templateUrl: './record-view.component.html',
  styleUrls: ['./record-view.component.css']
})
export class RecordViewComponent implements OnInit, OnDestroy {

  private readonly ds: deepstreamIO.Client

  @Input()
  recordName: string
  basename: string
  content: string
  private record: deepstreamIO.Record

  constructor(private dsService: DeepstreamService) {
    this.ds = dsService.getDeepstream()
  }

  ngOnInit() {
    if (this.recordName.startsWith("iw-introspection/records/")) {
      this.recordName = this.recordName.substring("iw-introspection/records/".length)
    }
    this.basename = path.basename(this.recordName)

    this.record = this.ds.record.getRecord(this.recordName)
    this.record.subscribe((data) => this.update(data), true)
  }

  ngOnDestroy() {
    if (this.record) {
      this.record.discard()
      this.record = undefined
    }
  }

  private update(data) {
    this.content = JSON.stringify(data, undefined, 2)
  }
}
