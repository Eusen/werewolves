import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TsKoaComponent } from './ts-koa.component';

describe('TsKoaComponent', () => {
  let component: TsKoaComponent;
  let fixture: ComponentFixture<TsKoaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TsKoaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TsKoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
