import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DirectoryViewComponent } from './directory-view/directory-view.component';
import { DirectoryPaneComponent } from './directory-pane/directory-pane.component';
import { RecordViewComponent } from './record-view/record-view.component';

@NgModule({
  declarations: [
    AppComponent,
    DirectoryViewComponent,
    DirectoryPaneComponent,
    RecordViewComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
