export type ProviderMetadata = {
    /**
     * Nom du service que l'on cherche a founir
     * 
     * par exemple : "formatter"
     */
    provide: string;

    /**
     * Fonction qui retourne une instance du service que l'on cherche 
     * a fournir
     * 
     * par exemple : () => new Formatter
     */
    construct: Function;
};

export type ProvidersMetadata = ProviderMetadata[];


export type ServiceInstance = {
    /**
     * Nom du service que l'on contient
     */
    name: string;

    /**
     * Instance du service
     */
    instance: any;
};

export type ServiceInstances = ServiceInstance[];


export type Module = {
    /**
     * Tableau qui doit contenir les classes de mes directives
     */
    declarations: any[];
    /**
     * Tableau qui contient les definitions de services pour mes
     * directives
     */
    providers?: ProvidersMetadata;
};