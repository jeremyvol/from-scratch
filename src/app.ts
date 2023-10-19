import { ChronoDirective } from './directives/chrono.directive';
import { CreditCardDirective } from './directives/credit-card.directive';
import { PhoneNumberDirective } from './directives/phone-number.directive';
import { UserProfileComponent } from './directives/user-profile.component';
import { Angular } from './framework/framework';
import { CreditCardVerifier } from './services/credit-card-verifier';
import { Formatter } from './services/formatter';

Angular.bootstrapApplication({
    declarations: [
        CreditCardDirective,
        ChronoDirective,
        PhoneNumberDirective,
        UserProfileComponent
    ],
    providers: [{
        provide: "formatter",
        construct: () => new Formatter("global")
    }, {
        provide: "verifier",
        construct: () => new CreditCardVerifier()
    }]
});



