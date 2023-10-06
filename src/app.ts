class CreditCardDirective {
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

const phoneElements = document.querySelectorAll<HTMLElement>('[phone-number]');

phoneElements.forEach(element => {
    const directive = new PhoneNumberDirective(element);
    directive.init();
});

const creditCardElements = document.querySelectorAll<HTMLElement>('[credit-card]');

creditCardElements.forEach(element => {
    const directive = new CreditCardDirective(element);
    directive.init();
});


