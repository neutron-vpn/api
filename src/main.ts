import {createLogger} from './modules/logger';
import {Server} from './modules/server';

export const logger = createLogger();
export const main = async (): Promise<boolean> => {
  logger.info('Initializing Nitrogen v1.0 ');
  new Server();
  return true;
};
