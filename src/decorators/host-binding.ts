import set from "lodash/set";

/**
 * Permet de lier une propriete de ma directive a une propriete de 
 * l'element HTML auquel la directive est liee
 * 
 * Exemple #1
 * @HostBinding('placeholder')
 * placeholderText = "Hello world";
 * 
 * Exemple #2 (propriete imbriquee)
 * @HostBinding('style.color')
 * color = "red";
 * 
 * @param attrName L'attribut que l'on souhaite lier a la propriete a la propriete de la directive
 */
export function HostBinding(attrName: string) {
    return function (decoratedClass, propName: string) {
        const originalInitFunction: Function = decoratedClass["init"] || function () {};

        decoratedClass["init"] = function () {
            originalInitFunction.call(this);

            set(this.element, attrName, this[propName]);
        };
    };
};
