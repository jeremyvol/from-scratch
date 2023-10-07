import { CreditCardDirective } from "./directives/credit-card.directive";
import { PhoneNumberDirective } from "./directives/phone-number.directive";

// Framework
const directives = [PhoneNumberDirective, CreditCardDirective];
directives.forEach(directive => {
    const elements = document.querySelectorAll<HTMLElement>(directive.selector);
    elements.forEach(element => {
        const directiveInstance = new directive(element);
        directiveInstance.init();
    });
});
