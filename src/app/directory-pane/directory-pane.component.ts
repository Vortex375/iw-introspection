import { Component, OnInit } from '@angular/core';
import { DeepstreamService } from '../deepstream.service';

import * as _ from 'lodash';

@Component({
  selector: 'app-directory-pane',
  templateUrl: './directory-pane.component.html',
  styleUrls: ['./directory-pane.component.css']
})
export class DirectoryPaneComponent implements OnInit {

  dirs: string[] = [];
  nodes: string[] = [];
  nodeMode = false;

  constructor(private dsService: DeepstreamService) { }

  ngOnInit() {
    this.dsService.getDeepstream().presence.getAll((err, names) => {
      this.nodes = _.map(names, name => `iw-introspection/nodes/${name}`);
      console.log('nodes', this.nodes);
    });
    this.dsService.getDeepstream().presence.subscribe((name, loggedIn) => {
      const index = _.findIndex(this.nodes, node => node.endsWith(name));
      if (loggedIn) {
        if (index >= 0) {
          return;
        }
        this.nodes.push(`iw-introspection/nodes/${name}`);
      } else {
        this.nodes.splice(index, 1);
      }
      console.log('nodes', this.nodes);
    });
  }

  setDir(index: number, path: string) {
    if (index > this.dirs.length) {
      return;
    }
    if (this.dirs[index] === path) {
      return;
    }
    if (index < this.dirs.length) {
      this.dirs.splice(index, this.dirs.length - index);
    }
    this.nodeMode = false;
    this.dirs.push(path);
  }

  showNodes() {
    this.nodeMode = true;
  }
}
