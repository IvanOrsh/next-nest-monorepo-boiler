import { Injectable } from '@nestjs/common';
import { add } from '@next-nest-monorepo-boiler/sample-lib';

@Injectable()
export class AppService {
  getHello(): string {
    return `Testing "sample-lib" from this monorepo: add(0, 42)=${add(0, 42)}`;
  }
}
