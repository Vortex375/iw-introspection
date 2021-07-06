import { Component, OnInit, Input } from '@angular/core';
import { Record } from '@deepstream/client/dist/src/record/record';
import { DeepstreamService } from '../deepstream.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { DeepstreamClient } from '@deepstream/client';
import * as path from 'path-browserify';

@Component({
  selector: 'app-node-view',
  templateUrl: './node-view.component.html',
  styleUrls: ['./node-view.component.css']
})
export class NodeViewComponent implements OnInit {

  private readonly ds: DeepstreamClient;

  @Input()
  recordName: string;
  basename: string;
  data: any;
  readonly displayedColumns = ['state', 'type', 'name', 'message'];
  private record: Record;

  constructor(private dsService: DeepstreamService,
             private bottomSheet: MatBottomSheet) {
    this.ds = dsService.getDeepstream();
  }

  ngOnInit() {
    this.basename = path.basename(this.recordName);

    this.record = this.ds.record.getRecord(this.recordName);
    this.record.subscribe(undefined, (data) => this.update(data), true);
  }

  update(data: any) {
    this.data = data;
  }
}
