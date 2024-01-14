import redisStore from 'cache-manager-ioredis'

import { CacheModuleOptions, CacheOptionsFactory } from '@nestjs/cache-manager'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class CacheConfigService implements CacheOptionsFactory {
  constructor(private readonly configService: ConfigService<Configs, true>) {}

  /**
   * Creates cache options for the cache module.
   * @returns {CacheModuleOptions} The cache options.
   */
  public createCacheOptions(): CacheModuleOptions {
    // Get the Redis host, port, TTL, and max values from the config service.
    const redisOptions: any = {
      host: this.configService.get('redis.REDIS_HOST') as string,
      port: this.configService.get('redis.REDIS_PORT') as number,
      max: this.configService.get('redis.REDIS_MAX') as number,
      // Include the Redis password if it is configured.
      ...(this.configService.get('redis.REDIS_PASSWORD')
        ? { password: this.configService.get('redis.REDIS_PASSWORD') }
        : {}),
    }

    // Create the cache options object.
    return {
      // Use the Redis store.
      store: redisStore,
      // Cache all values.
      is_cacheable_value: () => true,
      // Include the Redis options.
      ...redisOptions,
    }
  }
}
