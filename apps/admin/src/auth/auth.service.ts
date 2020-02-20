import {
  Injectable
} from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { JwtService } from '@nestjs/jwt';
import { User } from '@libs/mongo/models/user.model';
import { compareSync } from 'bcryptjs'

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
    private readonly jwtService: JwtService,
  ) { }
  async validateLocal(username: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ username }).select('+password');
    return (user && compareSync(password, user.password)) ? user : null;
  }

  async login(user: any): Promise<any> {
    const payload = { id: user._id };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async verifyJwt(id: string): Promise<any> {
    const user = await this.userModel.findById(id);
    return user ? user : null;
  }
}
