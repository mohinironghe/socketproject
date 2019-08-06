import { TestBed } from '@angular/core/testing';

import { GroupsocketService } from './groupsocket.service';

describe('GroupsocketService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GroupsocketService = TestBed.get(GroupsocketService);
    expect(service).toBeTruthy();
  });
});
