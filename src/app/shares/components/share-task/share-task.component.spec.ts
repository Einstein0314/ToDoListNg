import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareTaskComponent } from './share-task.component';

describe('ShareTaskComponent', () => {
  let component: ShareTaskComponent;
  let fixture: ComponentFixture<ShareTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
