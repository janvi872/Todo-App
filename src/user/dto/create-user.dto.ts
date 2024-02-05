import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';
export class CreateUserDTO {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;
}
