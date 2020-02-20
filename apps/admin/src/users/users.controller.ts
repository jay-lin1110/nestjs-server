import { Controller, UseGuards } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Crud } from 'nestjs-mongoose-crud';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ReturnModelType } from '@typegoose/typegoose';
import { User } from '@libs/mongo/models/user.model';

@Crud({
  model: User,
})
@ApiBearerAuth()
@ApiTags('admin/users')
@UseGuards(AuthGuard('jwt'))
@Controller('admin/users')
export class UsersController {
  constructor(@InjectModel(User) private readonly model: ReturnModelType<typeof User>) { }
}

