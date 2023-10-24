import { DefaultException } from '@/common/exceptions/default.exception';
import { HttpStatus } from '@nestjs/common';

export class ExampleException extends DefaultException {
  constructor(message: string) {
    super('EXAMPLE_EXCEPTION', message, HttpStatus.I_AM_A_TEAPOT);
  }
}
