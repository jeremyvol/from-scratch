import { Module, ProvidersMetadata, ServiceInstances } from "./types";

export class Framework {
    /** 
    * Tableau qui recense l'ensemble des directives declarees par 
    * mes collegues dans le projet
    */
    directives: any[] = [];

    /**
     * Tableau qui contient les instances de serives deja construites
     * (pour ne pas avoir a les reconstruire indefiniment)
     */
    services: ServiceInstances = [];

    /**
     * Tableau qui contient les definitions de mes services (comment 
     * construire tel ou tel service)
     */
    providers: ProvidersMetadata = [];

    /** 
     * Traitement qui va instancier les directives et les greffer aux elements HTML cibles
     *  par les selecteurs CSS;
     */
    bootstrapApplication(metadata: Module) {

        this.providers = metadata.providers || [];
        this.directives = metadata.declarations;

        this.directives.forEach(directive => {
            const elements = document.querySelectorAll<HTMLElement>(directive.selector);
            elements.forEach(element => {
                const params = this.analyseDirectiveConstructor(directive, element);
                const directiveInstance = Reflect.construct(directive, params);
                directiveInstance.init();
            });
        });
    }


    /**
     * Permet d'analyser les besoins d'un constructeur et de creer les
     *  instances necessaires (les dependances)
     * @param directive La classe de la directive a instancier
     * @param element L'element HTML sur lequel on veut greffer la directive
     * @returns Le tableau de parametres necessaire pour ionstancier ma directive
     */
    private analyseDirectiveConstructor(directive, element: HTMLElement) {
        const hasConstructor = /constructor\(.*\)/g.test(directive.toString());

        if (!hasConstructor) { return []; }

        const paramNames = this.extractParamNamesFromDirective(directive);

        const params = paramNames.map(name => {
            if (name === "element") {
                return element;
            }

            const directiveProviders = directive.providers || [];
            const directiveProvider = directiveProviders.find(p => p.provide === name);
            if (directiveProvider) {
                const instance = directiveProvider.construct();
                return instance;
            }

            const service = this.services.find(s => s.name === name);

            if (service) {
                return service.instance;
            }

            const provider = this.providers.find(p => p.provide === name);

            if (!provider) {
                throw new Error("Aucun fournisseur néxiste pour le service " + name);
            }
            const instance = provider.construct();

            this.services.push({ name, instance });

            return instance;

        });

        return params;
    }

    /**
     * Extrait les noms des parametres du constructeur d'une directive
     * 
     * @param directive La directive dont je veux connaitre les parametres
     * @returns Un tableau avec les noms des parametres du constructeur
     */
    private extractParamNamesFromDirective(directive) {
        const params = /constructor\((.*)\)/g.exec(directive.toString());
        if (!params) {
            return [];
        }
        return params[1].split(", ");
    }
}

export const Angular = new Framework;