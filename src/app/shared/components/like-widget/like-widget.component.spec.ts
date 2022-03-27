import { ComponentFixture, TestBed } from '@angular/core/testing';
import { doesNotReject } from 'assert';
import { LikeWidgetComponent } from './like-widget.component';
import { LikeWidgetModule } from './like-widget.module';

describe('LikeWidgetComponent', () => {
  let fixture: ComponentFixture<LikeWidgetComponent> = null;
  let component: LikeWidgetComponent = null;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LikeWidgetModule]
    }).compileComponents();

    fixture = TestBed.createComponent(LikeWidgetComponent);
    component = fixture.componentInstance;
  });

  it('Should create component', () => {
    expect(component).toBeTruthy();
  });

  it('Should auto-generate ID during ngOnInit when (@Input id) is not assigned', () => {
    fixture.detectChanges();
    expect(component.id).toBeTruthy();
  });

  it('Should NOT auto-generate ID during ngOnInit when (@Input id) is assigned', () => {
    const someId = 'someId';
    component.id = someId;
    fixture.detectChanges();
    expect(component.id).toBe(someId);
  });

  it(`#like should trigger (@Output liked) when called`, () => {
      spyOn(component.liked, 'emit');
      fixture.detectChanges();
      component.like();
      expect(component.liked.emit).toHaveBeenCalled();
  });

  it('(D) Should display number of likes when clicked', done => {
    fixture.detectChanges();
    component.liked.subscribe(() => {
      component.likes++;
      fixture.detectChanges();
      const counterEl: HTMLElement = fixture.nativeElement.querySelector('.like-counter');
      expect(counterEl.textContent.trim()).toBe('1');
      fixture.detectChanges();
      done();
    });
    const LikeWidgetContainerEl: HTMLElement = fixture.nativeElement.querySelector('.like-widget-container');
    LikeWidgetContainerEl.click();
  });
  
  it('(D) should display number of likes when ENTER is pressed', done => {
    fixture.detectChanges();
    component.liked.subscribe(() => {
      component.likes++;
      fixture.detectChanges();
      const counterEl: HTMLElement = fixture.nativeElement.querySelector('.like-counter');
      expect(counterEl.textContent.trim()).toBe('1');
      done();
    });
    const likeWdigetContainerEl: HTMLElement = fixture.nativeElement.querySelector('.like-widget-container');
    const event = new KeyboardEvent('keyup', {key: 'Enter'});
    likeWdigetContainerEl.dispatchEvent(event);
  });
});
