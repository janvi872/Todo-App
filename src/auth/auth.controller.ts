/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Get, UseGuards, HttpStatus, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('/signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    console.log(signUpDto, "dto")
    return await this.authService.signUp(signUpDto);
  }

  @Get('/login')
  async login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return await this.authService.login(loginDto);
  }
}
