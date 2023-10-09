export function Input(attrName: string) {
    return function (decoratedClass, propName: string) {

        const originalInitFunction: Function = decoratedClass["init"] || function () { };
        decoratedClass["init"] = function () {
            if (this.element.hasAttribute(`[${attrName}]`)) {
                this[propName] = this.element.getAttribute(`[${attrName}]`) === "true";
            }
            if (this.element.hasAttribute(attrName)) {
                this[propName] = this.element.getAttribute('border-color')!;
            }

            originalInitFunction.call(this);
        };
    };
}
