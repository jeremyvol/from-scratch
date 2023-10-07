export class PhoneNumberDirective {
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