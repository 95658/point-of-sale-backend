import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { LoginDto, RegisterDto } from './dto/auth_dto.js';

@Controller('auth')
export class AuthController {
    constructor (private readonly authService : AuthService){}

    @Post('register')
    async register (@Body()  dto: RegisterDto){
        return this.authService.register(dto);
    }

    @Post('login')
    async login(@Body() dto: LoginDto){
        return this.authService.login(dto);
    }
}
