import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DeepstreamService } from '../deepstream.service';

import * as path from "path-browserify"
import * as _ from "lodash"

const INDEX_RECORD = ".iw-index"

@Component({
  selector: 'app-directory-view',
  templateUrl: './directory-view.component.html',
  styleUrls: ['./directory-view.component.css']
})
export class DirectoryViewComponent implements OnInit {

  private readonly ds: deepstreamIO.Client

  @Output()
  openDir: EventEmitter<string> = new EventEmitter()

  @Input()
  root: string
  subdirs = []
  records = []

  constructor(private dsService: DeepstreamService) { 
    this.ds = dsService.getDeepstream()
  }

  ngOnInit() {
    this.ds.record.getRecord(path.join(this.root, INDEX_RECORD)).subscribe((data) => this.update(data), true)
  }

  private update(data) {
    this.subdirs = _.filter(data, s => s.endsWith("/"))
    this.records = _.map(_.filter(data, s => ! s.endsWith("/")), s => path.join(this.root, s))
  }

  openSubdir(subdir: string) {
    this.openDir.emit(path.join(this.root, subdir))
  }
}
