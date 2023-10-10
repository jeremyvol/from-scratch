import { Directive } from "../decorators/directive";
import { HostBinding } from '../decorators/host-binding';
import { HostListener } from '../decorators/host-listener';
import { Input } from '../decorators/input';
import { Formatter } from "../services/formatter";

@Directive({
    selector: "[phone-number]",
    providers: [{
        provide: "formatter",
        construct: () => new Formatter("specifique")
    }]
})
export class PhoneNumberDirective {
    @Input('with-spaces')
    willHaveSpaces = true;

    @Input('border-color')
    @HostBinding('style.borderColor')
    borderColor = 'red';

    @HostBinding('placeholder')
    placeholderText = "Hello world";

    constructor(
        public element: HTMLElement,
        private formatter: Formatter
    ) {}

    @HostListener("input", ['event.target'])
    formatPhoneNumber(element: HTMLInputElement) {
        element.value = this.formatter.formatNumber(
            element.value,
            10,
            2,
            this.willHaveSpaces
        );
    }
}