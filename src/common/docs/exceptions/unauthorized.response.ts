import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class UnauthorizedResponse {
  @ApiProperty({ example: HttpStatus.UNAUTHORIZED })
  statusCode: number;

  @ApiProperty({ example: 'Credentials incorrect' })
  message: string;

  @ApiProperty({ example: 'Unauthorized' })
  error: string;
}
