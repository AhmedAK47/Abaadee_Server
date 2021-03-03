import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthDto } from './auth.dto';
import { UserRepo } from './auth.reposatory';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(UserRepo)
    private userrepo:UserRepo,
    private jwtservice:JwtService
    ){}
    async SignUp(authdto:AuthDto){
        
        this.userrepo.SignUp(authdto);
    }
    async sigin(authdto:AuthDto){
        const username=await this.userrepo.ValidatePassword(authdto);
        if(!username){
            throw new UnauthorizedException("invalid Cridential");
        }
        const payload={username};
        const accesstoken=await this.jwtservice.sign(payload);
        return {accesstoken};
      
    }
}
