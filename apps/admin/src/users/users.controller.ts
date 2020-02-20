import { Controller, UseGuards } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Crud } from 'nestjs-mongoose-crud';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import { User } from '@libs/mongo/models/user.model'

@Crud({
  model: User
})
@ApiTags('admin/users')
@Controller('admin/users')
export class UsersController {
  constructor(@InjectModel(User) private readonly model: ReturnModelType<typeof User>) { }
}

