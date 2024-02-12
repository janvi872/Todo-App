import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
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


  async findAll(): Promise<User[]> {
    const users = await this.userModel.find().exec();
    if (!users) {
      throw new NotFoundException("User not found.")
    } return users;
  }


  async signUp(signUpDto: SignUpDto) {
    try {
      const { name, email, password, role } = signUpDto;
      console.log('Creating user in the database');
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await this.userModel.create({
        name,
        email,
        password: hashedPassword,
        role,
      });
      // console.log(user);
      const token = this.jwtService.sign({ id: user._id, role: user.role })

      return { token };
    } catch (err) {
      console.log(err)
    }
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password, role } = loginDto;

    const user = await this.userModel.findOne({ email })

    if (!user) {
      throw new UnauthorizedException('User Not Found.')
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid password.');
    }
    const token = this.jwtService.sign({ id: user._id, role: user.role })
    return { token };
  }

  async remove(userId: string) {
    // const userId = 
    const response = await this.userModel.findByIdAndDelete(userId).exec();
    console.log(response);
    if (!response && response == null) {
      throw new NotFoundException("User not found");
    } return "User Deleted";
  }
}
