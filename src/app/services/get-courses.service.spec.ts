import { TestBed, inject } from '@angular/core/testing';

import { GetCoursesService } from './get-courses.service';

describe('GetCoursesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetCoursesService]
    });
  });

  it('should be created', inject([GetCoursesService], (service: GetCoursesService) => {
    expect(service).toBeTruthy();
  }));
});
