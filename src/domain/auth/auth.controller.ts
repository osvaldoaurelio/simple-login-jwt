import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  BadRequestResponse,
  UnauthorizedResponse,
  InternalServerErrorResponse,
} from '../../common/docs/exceptions';
import { AuthService } from './auth.service';
import { AuthRequestDto, AuthResponseDto } from './dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Login request' })
  @ApiOkResponse({
    description: 'Login successfully',
    type: AuthResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Bad request',
    type: BadRequestResponse,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: UnauthorizedResponse,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
    type: InternalServerErrorResponse,
  })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() authRequestDto: AuthRequestDto) {
    return this.authService.login(authRequestDto);
  }
}
