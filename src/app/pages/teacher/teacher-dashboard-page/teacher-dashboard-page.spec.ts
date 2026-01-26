import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherDashboardPage } from './teacher-dashboard-page';

describe('TeacherDashboardPage', () => {
  let component: TeacherDashboardPage;
  let fixture: ComponentFixture<TeacherDashboardPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherDashboardPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherDashboardPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
