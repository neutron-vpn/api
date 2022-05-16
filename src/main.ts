import { createLogger } from './modules/logger';
import { Server } from './modules/server';
import config from 'config';

export const logger = createLogger();
export const main = async (): Promise<boolean> => {
    logger.info("Initializing Nitrogen v1.0 ");
    const server = new Server();
    return true;
};