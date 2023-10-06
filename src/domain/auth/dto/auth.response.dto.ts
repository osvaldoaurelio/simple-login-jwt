import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3ZTA2MTkyYS1jMzAxLTQ4MDctYWY4MC0xNWFkOGQ0OGRmNjUiLCJyZ...'
  })
  access_token: string;
}
