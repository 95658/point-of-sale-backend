import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { ROLES_KEY, UserRole } from "../decorators/roles.decorator.js"
import { Reflector } from "@nestjs/core";


interface AuthanticatedRequest {
    user: {
        userId: number;
        name: string;
        role?: UserRole;
    }
}

@Injectable()
export class RolesGuard implements CanActivate {
    constructor (private readonly reflector: Reflector){}

    canActivate(context: ExecutionContext): boolean {

        const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
            ROLES_KEY,
            [context.getHandler(), context.getClass() ]
        );
        if (!requiredRoles?.length)
            return true;

        const request = context.switchToHttp().getRequest<AuthanticatedRequest>();
        const user = request.user;

        if (!user || !user.role || !requiredRoles.includes(user.role)){
            throw new ForbiddenException('You don\'t have permission');
        }
        return true;
    }

}