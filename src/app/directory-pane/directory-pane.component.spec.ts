import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectoryPaneComponent } from './directory-pane.component';

describe('DirectoryPaneComponent', () => {
  let component: DirectoryPaneComponent;
  let fixture: ComponentFixture<DirectoryPaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectoryPaneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectoryPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
