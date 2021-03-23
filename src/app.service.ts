import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    throw new Error(`${JSON.stringify(
      {
        statusCode: 777,
        message: 'Error message'
      }
    )}`);
    return 'Hello World!';
  }
}
