import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class AuthRequestDto {
  @ApiProperty({ example: 'username1' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'password1' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  rememberMe: boolean;
}
