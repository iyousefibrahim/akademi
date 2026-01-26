import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherStudentsPage } from './teacher-students-page';

describe('TeacherStudentsPage', () => {
  let component: TeacherStudentsPage;
  let fixture: ComponentFixture<TeacherStudentsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherStudentsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherStudentsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
