/* eslint-disable prettier/prettier */
// import { UsersService } from 'src/users/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/auth/schema/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from './dto/signup.dto';
import { InjectModel } from '@nestjs/mongoose';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private jwtService: JwtService) { }

  async signUp(signUpDto: SignUpDto) {
    try {
      const { name, email, password } = signUpDto;
      console.log('Creating user in the database');
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await this.userModel.create({
        name,
        email,
        password: hashedPassword,
      });
      // console.log(user);
      const token = this.jwtService.sign({ id: user._id })

      return { token };
    } catch (err) {
      console.log(err)
    }
  }

  async validateUser(email: string, password: string): Promise<string> {
    const hashPassword = await bcrypt.hash(password, 10)
    // const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email, password: hashPassword });
    console.log(user);
    if (!user) {
      // const newUser = user._id.toString();
      return null;
    } else {
      return user._id.toString();
    }
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email })

    if (!user) {
      throw new UnauthorizedException('User Not Found.')
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid password.');
    }
    const token = this.jwtService.sign({ id: user._id })
    return { token };
  }

}
