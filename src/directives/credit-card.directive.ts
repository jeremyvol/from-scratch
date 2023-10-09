import { Formatter } from "../services/formatter";
import { CreditCardVerifier } from "../services/credit-card-verifier";
import { Directive } from '../decorators/directive';

@Directive({ selector: '[credit-card]' })
export class CreditCardDirective {
    constructor(
        private verifier: CreditCardVerifier,
        public element: HTMLElement,
        private formatter: Formatter,
    ) { }

    formatCreditCardNumber(element: HTMLInputElement) {
        element.value = this.formatter.formatNumber(element.value, 16, 4);
    }

    init() {
        this.element.style.borderColor = "blue";
        this.element.addEventListener('input', event => {
            this.formatCreditCardNumber(event.target as HTMLInputElement);
        });
    }
}