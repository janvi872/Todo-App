/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Get, UseGuards, Req, Request, Delete, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { RoleGuard } from 'src/auth/guards/role.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('/signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    // console.log(signUpDto, "dto")
    return await this.authService.signUp(signUpDto);
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return await this.authService.login(loginDto);
  }

  @Get('/users')
  @UseGuards(RoleGuard)
  findAll() {
    // const role = request['role'];
    const users = this.authService.findAll();
    return users;
  }

  @Delete('/delete/:userId')
  @UseGuards(RoleGuard)
  async remove(@Param('userId') userId: string) {
    return await this.authService.remove(userId);
  }
}
