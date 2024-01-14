import { Cache } from 'cache-manager'
import { Redis } from 'ioredis'

import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Inject, Injectable, Logger } from '@nestjs/common'

export type TCacheKey = string
export type TCacheResult<T> = Promise<T | undefined>

@Injectable()
export class CacheService {
  private cache!: Cache
  private logger = new Logger(CacheService.name)

  constructor(@Inject(CACHE_MANAGER) cache: Cache) {
    this.cache = cache
    this.redisClient.on('ready', () => {
      this.logger.log('Redis is ready!')
    })
  }

  /**
   * Constructor function for the class.
   *
   * @param {Cache} cache - The cache manager object.
   * @return {void} This function does not return a value.
   */
  private get redisClient(): Redis {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return this.cache.store.getClient()
  }

  /**
   * Get the client.
   *
   * @return {Any} The Redis client.
   */
  public getClient() {
    return this.redisClient
  }

  /**
   * Retrieves the value associated with the specified key from the cache.
   *
   * @param {TCacheKey} key - The key used to retrieve the value from the cache.
   * @return {TCacheResult<T>} The value associated with the specified key.
   */
  public get<T>(key: TCacheKey): TCacheResult<T> {
    return this.cache.get(key)
  }

  /**
   * Sets a value in the cache with an optional time-to-live (TTL) in seconds.
   *
   * @param {TCacheKey} key - The key for the value being set in the cache.
   * @param {string} value - The value to be set in the cache.
   * @param {number} ttl - The optional time-to-live (TTL) for the value in seconds. If not provided, the value will be cached indefinitely.
   * @return {void} - This function does not return anything.
   */
  public set(key: TCacheKey, value: TCacheKey, ttl?: number) {
    return this.cache.set(key, value, ttl || 0)
  }

  /**
   * Removes the value associated with the specified key from the cache.
   *
   * @param {TCacheKey} key - The key used to remove the value from the cache.
   * @return {void} - This function does not return anything.
   */
  public delete(key: TCacheKey) {
    return this.cache.del(key)
  }
}
