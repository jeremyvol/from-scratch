import { Directive } from '../decorators/directive';
import { Input } from '../decorators/input';

@Directive({
    selector: "[user-profile]"
})
export class UserProfileDirective {

    @Input('first-name')
    firstName: string;

    @Input('last-name')
    lastName: string;

    @Input('job')
    job: string;

    template = `
        <h3 (click)="onClickH3">
        {{ firstName }} {{ lastName }}
        </h3>
        <strong>Poste : </strong>{{ job }}
        <button (click)="onClickButton" (dblclick)="onDblClickButton">Changer le prenom</button>
        `;

    onClickH3() {
        console.log('Click sur le h3');
    }

    onDblClickButton() {
        this.firstName = "Marion";
    }

    onClickButton() {
        this.firstName = "Roger";
    }


    constructor(public element: HTMLElement) {}

    init() {
        this.render();
    }

    render() {
        let renderedTemplate = this.template;

        // gestion des interpolations
        this.template.match(/{{.*?}}/g).forEach(interpolation => {
            const propName = interpolation.replace(/{{|}}/g, '').trim();
            renderedTemplate = renderedTemplate.replace(interpolation, this[propName]);
        });

        const eventsToBind: {
            elementId: string;
            eventName: string;
            methodName: string;
        }[] = [];

        this.template
            .match(/<.*?\(.*?\)=\".*?\".*?>/g)
            .forEach(baliseOuvrante => {
                const randomId = 'event-listener-' + Math.ceil(Math.random() * 1000);

                baliseOuvrante
                    .match(/\(.*?\)=\".*?\"/g)
                    .forEach(event => {
                        const eventName = event
                            .match(/\(.*?\)/g)[0]
                            .replace(/\(|\)/g, '');
                        const methodName = event
                            .match(/\".*?\"/g)[0]
                            .replace(/\"/g, '');

                        eventsToBind.push({
                            elementId: randomId,
                            eventName,
                            methodName
                        });
                    });
                const finalBaliseOuvrante = baliseOuvrante
                    .replace(/\(.*?\)=\".*?\"/g, '')
                    .replace(/>/g, `id="${randomId}">`);

                renderedTemplate = renderedTemplate.replace(
                    baliseOuvrante,
                    finalBaliseOuvrante
                );
            });
        this.element.innerHTML = renderedTemplate;

        eventsToBind.forEach(eventToBind => {
            this.element
                .querySelector(`#${eventToBind.elementId}`)
                .addEventListener(eventToBind.eventName, () => {
                    this[eventToBind.methodName]();
                    this.render();
                });
        });
    }
}