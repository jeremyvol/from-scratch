import set from "lodash/set";

export class ChangeDetector {
    bindings: {
        element: HTMLElement;
        attrName: string;
        value: any;
    }[] = [];

    addBinding(
        element: HTMLElement,
        attrName: string,
        value: any,
    ) {
        this.bindings = this.bindings.filter(b => !(b.element === element && b.attrName === attrName));

        this.bindings.push({
            element,
            attrName,
            value,
        });
        // console.table(this.bindings);
    };

    digest() {
        console.group("Digest !");
        while (this.bindings.length > 0) {
            const binding = this.bindings.pop();
            console.log("Mise en place de " + binding.value + " dans l'attribut", binding.attrName, "de l'element", binding.element);
            set(binding.element, binding.attrName, binding.value);
        }
        console.groupEnd();
    }
}

export const Detector = new ChangeDetector();