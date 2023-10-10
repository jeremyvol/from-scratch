/**
 * Permet de lier une methode de la directive a un evenemtne qui aura lieu sur l'element HTML
 * 
 * @param eventName L'evenement auquel on souhaite reagir et lier la methode 
 * @param params Un tableau des parametres dont on a besoin
 * 
 * Par exemple : 
 * 
 * @HostListener('click',["event.target"])
 * onClick(target) {}
 */
export function HostListener(
    eventName: string,
    params: (string | number)[] = []
) {
    return function (decoratedClass, methodName: string) {
        const originalInitFunction: Function = decoratedClass["init"] || function () {};

        decoratedClass["init"] = function () {
            originalInitFunction.call(this);

            this.element.addEventListener(eventName, event => {
                const paramsToSend = params.map(param => eval(param.toString()));
                this[methodName](...paramsToSend);
            });
        };
    };
};