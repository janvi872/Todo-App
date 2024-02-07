/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('/signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    // console.log(signUpDto, "dto")
    return await this.authService.signUp(signUpDto);
  }

  // @Post('/getUserId')
  // async getUserId(@Body() credentials: { email: string; password: string }): Promise<{ userId: string } | { error: string }> {
  //   const userId = await this.authService.validateUser(credentials.email, credentials.password);
  //   // return await this.authService.
  //   if (userId) {
  //     return { userId };
  //   } else {
  //     return { error: 'not valid' };
  //   }
  // }

  @Post('/login')
  async login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return await this.authService.login(loginDto);
  }
}
