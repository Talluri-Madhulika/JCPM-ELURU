import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionSongsComponent } from './action-songs.component';

describe('ActionSongsComponent', () => {
  let component: ActionSongsComponent;
  let fixture: ComponentFixture<ActionSongsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActionSongsComponent]
    });
    fixture = TestBed.createComponent(ActionSongsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
