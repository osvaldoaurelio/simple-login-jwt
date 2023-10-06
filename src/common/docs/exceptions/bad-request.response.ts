import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class BadRequestResponse {
  @ApiProperty({ example: HttpStatus.BAD_REQUEST })
  statusCode: number;

  @ApiProperty({
    example: ['property must be a string', 'property should not be empty'],
  })
  message: string[];

  @ApiProperty({ example: 'Bad request' })
  error: string;
}
