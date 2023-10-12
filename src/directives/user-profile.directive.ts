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


    constructor(public element: HTMLElement) {}

    init() {
        this.render();

        this.element.querySelector('button').addEventListener(
            'click', () => {
                this.firstName = "Roger";
                this.render();
            }
        );
    }

    render() {
        this.element.innerHTML = `
        <h3>${this.firstName} ${this.lastName}</h3>
        <strong>Poste : </strong>${this.job}
        <button>Changer le prenom</button>
        `;
    }
}