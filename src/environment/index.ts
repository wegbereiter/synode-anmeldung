import {AppEnviornment} from './environment.interface';
import {ProductionEnvironment} from './production.environment';
import {DevelopEnvironment} from './develop.environment';

export const resolveEnvironment = (env: string): AppEnviornment => {
    if (env === 'production') {
        return new ProductionEnvironment();
    } else {
        return new DevelopEnvironment();
    }
};
