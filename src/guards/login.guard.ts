import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class UserGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {

        const request = context.switchToHttp().getRequest();


        if (!request.headers || !request.headers.authorization) {
            throw new UnauthorizedException();
        }
        console.log(request.headers);

        const token = request.headers.authorization.split(' ')[1];
        console.log(token);

        if (!token) {
            throw new UnauthorizedException("Not found");
        }
        try {
            const decodedToken = this.jwtService.verify(token);
            request.user = decodedToken.id;
        } catch (error) {
            console.log(error);
            throw new UnauthorizedException();
        }
        return true;
    }
}