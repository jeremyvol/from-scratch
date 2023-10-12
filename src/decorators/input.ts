/**
 * Permet de recuperer une information dans un sttribut de l'element 
 * auquel est rattache ma directive
 * 
 * @param attrName L'attribut dans lequel on veut recuperer une information
 */
export function Input(attrName: string) {
    return function (decoratedClass, propName: string) {

        const originalInitFunction: Function = decoratedClass["init"] || function () {};
        decoratedClass["init"] = function () {
            if (this.element.hasAttribute(`[${attrName}]`)) {
                this[propName] = this.element.getAttribute(`[${attrName}]`) === "true";
            }
            if (this.element.hasAttribute(attrName)) {
                this[propName] = this.element.getAttribute(attrName)!;
            }

            originalInitFunction.call(this);
        };
    };
}
