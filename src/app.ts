import { CreditCardDirective } from "./directives/credit-card.directive";
import { PhoneNumberDirective } from "./directives/phone-number.directive";
import { Angular } from "./framework/framework";
import { NgZone } from './framework/zone';
import { CreditCardVerifier } from "./services/credit-card-verifier";
import { Formatter } from "./services/formatter";

NgZone.run(() => {
    Angular.bootstrapApplication({
        declarations: [PhoneNumberDirective, CreditCardDirective],
        providers: [{
            provide: "formatter",
            construct: () => new Formatter("global")
        }, {
            provide: "verifier",
            construct: () => new CreditCardVerifier()
        }]
    });
});


