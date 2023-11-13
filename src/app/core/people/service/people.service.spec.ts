// @ts-nocheck
import { async } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { of as observableOf } from 'rxjs';

import { PeopleService } from './people.service';


@Injectable()
class MockHttpClient {
  post() {};
  get() {}
}

describe('PeopleService', () => {
  let service;

  beforeEach(() => {
    service = new PeopleService(new MockHttpClient());
  });

  it('should run #getPeopleByName()', async () => {
    service.httpClient = service.httpClient || {};
    spyOn(service.httpClient, 'get').and.returnValue(observableOf({}));
    service.getPeopleByName({});
    expect(service.httpClient.get).toHaveBeenCalled();
  });

  it('should run #getPeopleById()', async () => {
    service.httpClient = service.httpClient || {};
    spyOn(service.httpClient, 'get').and.returnValue(observableOf({}));
    service.getPeopleById({});
    expect(service.httpClient.get).toHaveBeenCalled();
  });

  it('should run #searchByLink()', async () => {
    service.httpClient = service.httpClient || {};
    spyOn(service.httpClient, 'get').and.returnValue(observableOf({}));
    service.searchByLink({});
    expect(service.httpClient.get).toHaveBeenCalled();
  });

})