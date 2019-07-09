import * as dotenv from 'dotenv';

export class ConfigService {
  private readonly envConfig: { [key: string ]: string };

  constructor() {
    this.envConfig = dotenv.config().parsed;
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
