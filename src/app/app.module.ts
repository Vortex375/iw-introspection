import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatCardModule} from '@angular/material/card';

import { AppComponent } from './app.component';
import { DirectoryViewComponent } from './directory-view/directory-view.component';
import { DirectoryPaneComponent } from './directory-pane/directory-pane.component';
import { RecordViewComponent } from './record-view/record-view.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditRecordComponent } from './edit-record/edit-record.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TextFieldModule } from '@angular/cdk/text-field';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import {MatTableModule} from '@angular/material/table';
import { NodeViewComponent } from './node-view/node-view.component';

@NgModule({
  declarations: [
    AppComponent,
    DirectoryViewComponent,
    DirectoryPaneComponent,
    RecordViewComponent,
    EditRecordComponent,
    NodeViewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    TextFieldModule,
    MatListModule,
    MatDividerModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
