import set from "lodash/set";

export function HostBinding(attrName: string) {
    return function (decoratedClass, propName: string) {
        const originalInitFunction: Function = decoratedClass["init"] || function () {};

        decoratedClass["init"] = function () {
            originalInitFunction.call(this);

            set(this.element, attrName, this[propName]);
        };
    };
};
