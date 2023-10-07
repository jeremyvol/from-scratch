class CreditCardDirective {
    static selector = '[credit-card]';

    constructor(public element: HTMLElement) { }

    formatCreditCardNumber(element: HTMLInputElement) {
        const value = element.value.replace(/[^\d]/g, '').substring(0, 16);

        const groups: string[] = [];
        for (let i = 0; i < value.length; i += 4) {
            groups.push(value.substring(i, i + 4));
        }

        element.value = groups.join(' ');
    }

    init() {
        this.element.addEventListener('input', event => {
            this.formatCreditCardNumber(event.target as HTMLInputElement);
        });
    }
}


class PhoneNumberDirective {
    static selector = '[phone-number]';

    constructor(public element: HTMLElement) { }

    formatPhoneNumber(element: HTMLInputElement) {
        const value = element.value.replace(/[^\d]/g, '').substring(0, 10);
        const groups: string[] = [];
        for (let i = 0; i < value.length; i += 2) {
            groups.push(value.substring(i, i + 2));
        }
        element.value = groups.join(' ');
    }


    init() {
        this.element.addEventListener('input', event => {
            this.formatPhoneNumber(event.target as HTMLInputElement);
        });
    }
}

// Framework
const directives = [PhoneNumberDirective, CreditCardDirective];
directives.forEach(directive => {
    const elements = document.querySelectorAll<HTMLElement>(directive.selector);
    elements.forEach(element => {
        const directiveInstance = new directive(element);
        directiveInstance.init();
    });
});
