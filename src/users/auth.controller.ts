import { Body, Controller, Post } from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { LoginUserRequestDto } from './dtos/login-user-request.dto';
import { LoginUserResponseDto } from './dtos/login-user-respone.dto';
import { RegisterUserRequestDto } from './dtos/register-user-request.dto';
import { RegisterUserResponseDto } from './dtos/register-user-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @Serialize(RegisterUserResponseDto)
  async register(@Body() data: RegisterUserRequestDto) {
    return this.authService.register(
      data.mobile,
      data.password,
      data.age,
      data.name,
    );
  }

  @Post('login')
  @Serialize(LoginUserResponseDto)
  async login(@Body() data: LoginUserRequestDto) {
    const accessToken = await this.authService.login(
      data.mobile,
      data.password,
    );
    return { accessToken };
  }
}
