import { Directive } from "../decorators/directive";
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
    borderColor = 'red';

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

    init() {
        this.element.style.borderColor = this.borderColor;
    }
}