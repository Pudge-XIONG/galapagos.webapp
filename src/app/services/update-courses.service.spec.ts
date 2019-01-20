import { TestBed } from '@angular/core/testing';

import { UpdateCoursesService } from './update-courses.service';

describe('UpdateCoursesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UpdateCoursesService = TestBed.get(UpdateCoursesService);
    expect(service).toBeTruthy();
  });
});
