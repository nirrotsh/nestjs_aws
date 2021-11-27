import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  greet(firstName: string, lastName: string) {
    return `Greeing ${firstName} ${lastName}; Live long and prosper 🖖`;
  }
  getHello(): string {
    return 'Hello World!';
  }
}
