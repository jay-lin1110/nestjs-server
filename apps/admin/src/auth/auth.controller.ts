import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Request,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '@libs/mongo/models/user.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { AuthDto } from './dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service'

@Injectable()
@ApiTags('admin/auth')
@Controller('admin/auth')
export class AuthController {
  constructor(
    @InjectModel(User) private readonly UserModel: ReturnModelType<typeof User>,
    private readonly authService: AuthService,
  ) { }
  @Post('register')
  async register(@Body() body: AuthDto) {
    const { username, password } = body;
    const user = await this.UserModel.create({ username, password });
    return user;
  }

  @Post('login')
  @UseGuards(AuthGuard('local-admin'))
  async login(@Body() body: AuthDto, @Request() req) {
    return this.authService.login(req.user)
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  profile(@Request() req) {
    const { username } = req.user;
    return {
      code: 0,
      message: 'success',
      username,
    };
  }
}

