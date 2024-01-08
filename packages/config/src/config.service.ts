import { DynamicModule, Injectable, Type, Logger } from '@nestjs/common';
import { IPluginConfig, IApiServerOptions, IAssetOptions, IDbConnectionOptions } from '@gauzy/common';
import { getConfig } from './config-manager';
import { environment } from './environments/environment';
import { IEnvironment } from './environments/ienvironment';

@Injectable()
export class ConfigService {
	public config: Partial<IPluginConfig>;
	private readonly environment = environment;
	private readonly logger = new Logger(ConfigService.name);

	constructor() {
		this.config = getConfig();

		for (const [key, value] of Object.entries(environment.env)) {
			process.env[key] = value;
		}

		this.logger.log(`Is Production: ${environment.production}`);
	}

	get apiConfigOptions(): IApiServerOptions {
		return this.config.apiConfigOptions;
	}

	get graphqlConfigOptions() {
		return this.config.apiConfigOptions.graphqlConfigOptions;
	}

	get dbConnectionOptions(): IDbConnectionOptions {
		return this.config.dbConnectionOptions;
	}

	get plugins(): Array<DynamicModule | Type<any>> {
		return this.config.plugins;
	}

	get assetOptions(): Required<IAssetOptions> {
		return this.config.assetOptions;
	}

	get<T>(key: keyof IEnvironment): IEnvironment[keyof IEnvironment] {
		return this.environment[key] as T;
	}

	isProd(): boolean {
		return this.environment.production;
	}
}
