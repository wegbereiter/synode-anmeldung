import {AppEnvironment} from './environment.interface';

export abstract class AbstractEnvironment implements AppEnvironment {
    public preInit() {
        // Default does nothing
    }

    public postInit(moduleRef: any) {
        // Default does nothing
    }
}
