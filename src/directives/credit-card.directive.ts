import { Formatter } from "../services/formatter";
import { CreditCardVerifier } from "../services/credit-card-verifier";
import { Directive } from '../decorators/directive';

import { HostBinding } from '../decorators/host-binding';
import { HostListener } from '../decorators/host-listener';

@Directive({ selector: '[credit-card]' })
export class CreditCardDirective {
    constructor(
        private verifier: CreditCardVerifier,
        public element: HTMLElement,
        private formatter: Formatter,
    ) {}

    @HostBinding('style.borderColor')
    borderColor = 'blue';

    @HostListener("input", ['event.target'])
    formatCreditCardNumber(element: HTMLInputElement) {
        element.value = this.formatter.formatNumber(element.value, 16, 4);
    }
}