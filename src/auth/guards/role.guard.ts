import { CanActivate, ExecutionContext } from '@nestjs/common/interfaces';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';


@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector, private jwtService: JwtService) { }
    canActivate(context: ExecutionContext): boolean {

        const requiredRoles = this.reflector.get<string[]>('role', context.getHandler());

        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization?.split(' ')[1];

        if (!token) {
            throw new UnauthorizedException('Access denied. No token provided.');
        }

        try {
            const decoded = this.jwtService.verify(token);
            const userRole = decoded.role;
            console.log(userRole);

            if (userRole && userRole == 'admin') {
                return true;
            }

            return false;
        } catch (error) {
            throw new UnauthorizedException('Invalid token.');
        }
    }
}

