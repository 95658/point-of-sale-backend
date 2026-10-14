import { SetMetadata } from "@nestjs/common";

export const ROLES_KEY = 'roles';

export type UserRole = 'admin' | 'cashier';

export const roles = (...roles: UserRole[])=>
    SetMetadata(ROLES_KEY,roles);