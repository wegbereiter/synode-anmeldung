import {AppEnviornment} from './environment.interface';

export abstract class AbstractEnvironment implements AppEnviornment {
    public preInit() {
        // Default does nothing
    }

    public postInit(moduleRef: any) {
        // Default does nothing
    }
}
