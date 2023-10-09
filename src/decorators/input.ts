export function Input(attrName: string) {
    return function (decoratedClass, propName: string) {

        const originalInitFunction: Function = decoratedClass["init"] || function () { };
        decoratedClass["init"] = function () {
            // if (this.element.hasAttribute('with-spaces')) {
            //     this.willHaveSpaces = this.element.getAttribute('with-spaces') === "true";
            // }
            if (this.element.hasAttribute(attrName)) {
                this.borderColor = this.element.getAttribute('border-color')!;
            }

            originalInitFunction.call(this);
        };
    };
}
