export interface AppEnviornment {
    preInit(): void;
    postInit(moduleRef: any): any;
}