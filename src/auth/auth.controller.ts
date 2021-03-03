import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authservice: AuthService) { }
    @Post('signup')
    SignUp(@Body(ValidationPipe
    ) authdto: AuthDto) {
        this.authservice.SignUp(authdto);
    }
    @Post('signin')
    Signin(@Body(ValidationPipe
    ) authdto: AuthDto) {
     return this.authservice.sigin(authdto);
    }
}
