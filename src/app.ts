import { CreditCardDirective } from "./directives/credit-card.directive";
import { PhoneNumberDirective } from "./directives/phone-number.directive";
import { Formatter } from "./services/formatter";

// Framework
const directives = [PhoneNumberDirective, CreditCardDirective];

const formatter = new Formatter;

directives.forEach(directive => {
    const elements = document.querySelectorAll<HTMLElement>(directive.selector);
    elements.forEach(element => {
        const directiveInstance = new directive(element, formatter);
        directiveInstance.init();
    });
});
