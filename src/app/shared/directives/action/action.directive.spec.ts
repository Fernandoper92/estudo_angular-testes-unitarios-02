import { ActionDirective } from './action.directive';
import { ActionDirectiveModule } from './action.module';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
describe('ActionDirective', () => {
    let fixture: ComponentFixture<ActionDirectiveTestComponent>;
    let component: ActionDirectiveTestComponent;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ActionDirectiveTestComponent],
            imports: [ActionDirectiveModule]
        }).compileComponents();

        fixture = TestBed.createComponent(ActionDirectiveTestComponent);
        component = fixture.componentInstance;
    });

    it('(D) (@Output appAction) should emit event with payload when ENTER key is pressed', () => {
        // Usando debugElement no lugar de debugElement para buscar por uma diretiva ao invés de buscar por uma classe
        // OBS: o "By" passado como parâmetro no debugElement.query() é importado do platform-browser
        // const divEl: HTMLElement = fixture.nativeElement.querySelector('.dummy-component');
        const divEl = fixture.debugElement.query(By.directive(ActionDirective)).nativeElement;
        const event = new KeyboardEvent('keyup', {key: 'Enter'});
        divEl.dispatchEvent(event);
        expect(component.hasEvent()).toBeTrue();
    });

    it('(D) (@Output appAction) should emit event with payload when clicked', () => {
        const divEl: HTMLElement = fixture.nativeElement.querySelector('.dummy-component');
        const event = new Event('click');
        divEl.dispatchEvent(event);
        expect(component.hasEvent()).toBeTrue();
    });
    
    it('(D) (@Output appAction) should emit event with payload when clicked or ENTER key pressed', () => {
        const divEl: HTMLElement = fixture.nativeElement.querySelector('.dummy-component');
        const clickEvent = new Event('click');
        const keyBoardEvent = new KeyboardEvent('keyup', { key: 'Enter' });
        divEl.dispatchEvent(clickEvent);
        expect(component.hasEvent()).withContext('Click event').toBeTrue();
        component.clearEvent();
        divEl.dispatchEvent(keyBoardEvent);
        expect(component.hasEvent()).withContext('keyboard event "keyup"').toBeTrue();
    });
});

@Component({
    template: `<div class="dummy-component" (appAction)="actionHandler($event)"></div>`
})
class ActionDirectiveTestComponent {
    private event: Event = null;

    public actionHandler(event: Event): void {
        this.event = event;
    }
    public hasEvent(): boolean {
        return !!this.event;
    }

    public clearEvent(): void {
        this.event = null;
    }
}