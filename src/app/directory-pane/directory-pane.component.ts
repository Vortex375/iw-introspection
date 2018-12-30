import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directory-pane',
  templateUrl: './directory-pane.component.html',
  styleUrls: ['./directory-pane.component.css']
})
export class DirectoryPaneComponent implements OnInit {

  dirs = []

  constructor() { }

  ngOnInit() {
  }

  setDir(index: number, path: string) {
    if (index > this.dirs.length) {
      return
    }
    if (this.dirs[index] === path) {
      return
    }
    if (index < this.dirs.length) {
      this.dirs.splice(index, this.dirs.length - index)
    }
    this.dirs.push(path)
  }
}
