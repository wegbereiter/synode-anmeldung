export interface AppEnvironment {
    preInit(): void;
    postInit(moduleRef: any): any;
}
