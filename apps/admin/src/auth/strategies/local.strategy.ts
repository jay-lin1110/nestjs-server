import { Strategy, IStrategyOptions } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import {
  Injectable,
  BadRequestException
} from '@nestjs/common';
import { AuthService } from '../auth.service'


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local-admin') {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'username',
      passwordField: 'password',
    } as IStrategyOptions);
  }
  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateLocal(username, password);
    if (!user) {
      throw new BadRequestException('用户名或密码错误！');
    }
    return user;
  }
}
