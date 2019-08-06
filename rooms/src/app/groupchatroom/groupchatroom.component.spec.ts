import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupchatroomComponent } from './groupchatroom.component';

describe('GroupchatroomComponent', () => {
  let component: GroupchatroomComponent;
  let fixture: ComponentFixture<GroupchatroomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupchatroomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupchatroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
