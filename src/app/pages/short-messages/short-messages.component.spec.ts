import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortMessagesComponent } from './short-messages.component';

describe('ShortMessagesComponent', () => {
  let component: ShortMessagesComponent;
  let fixture: ComponentFixture<ShortMessagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShortMessagesComponent]
    });
    fixture = TestBed.createComponent(ShortMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
