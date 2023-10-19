import { Component } from '../decorators/component';
import { Input } from '../decorators/input';

@Component({
    selector: "user-profile",
    template: `
        <h3 (click)="onClickH3">
        {{ firstName }} {{ lastName }}
        </h3>
        <strong>Poste : </strong>{{ job }}
        <button (click)="onClickButton" (dblclick)="onDblClickButton">Changer le prenom</button>
        `
})
export class UserProfileComponent {

    @Input('first-name')
    firstName: string;

    @Input('last-name')
    lastName: string;

    @Input('job')
    job: string;

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
}