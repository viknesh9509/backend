import {Injectable} from "@nestjs/common";
import {ExtractJwt, Strategy} from "passport-jwt";
import {ConfigService} from "@nestjs/config";
import {PassportStrategy} from "@nestjs/passport";
import { UsersService } from "./users.service";
import { jwtSecret } from "libs/shared/constants/constant";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: {userId:number}) {
    const user = await this.usersService.findOne(payload.userId);
    // @ts-ignore
    if(!user){
      throw new Error('User not found');
    }
    return user;
  }
}
