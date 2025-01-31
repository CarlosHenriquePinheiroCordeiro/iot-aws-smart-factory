import { Injectable } from '@nestjs/common';
import { createClient } from 'redis';

@Injectable()
export class RedisService {
  private client;

  constructor() {
    this.client = createClient({
      url: `${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    });
    this.client.connect();
  }

  getClient() {
    return this.client;
  }
}
