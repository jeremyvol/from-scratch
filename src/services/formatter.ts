export class Formatter {
    constructor(name: string) {
        console.log("je suis le formateur ", name);
    }

    formatNumber(
        initalValue: string,
        length: number,
        groupLength: number,
        willHaveSpaces = true
    ) {
        const value = initalValue.replace(/[^\d]/g, '').substring(0, length);
        const groups: string[] = [];

        for (let i = 0; i < value.length; i += groupLength) {
            groups.push(value.substring(i, i + groupLength));
        }

        return groups.join(willHaveSpaces ? ' ' : '');
    }
}