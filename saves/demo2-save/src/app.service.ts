import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  acceptNumber(id: any): string {
    // console.log({ id });
    // console.log(typeof id);
    if (typeof id !== 'number') {
      throw new Error('Not a number');
    }
    return 'Got a number';
  }
}
