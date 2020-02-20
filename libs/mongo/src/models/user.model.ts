import { prop } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { hashSync } from 'bcryptjs'

class User {
  @ApiProperty({
    name: 'username'
  })
  @prop({
    required: true,
    trim: true
  })
  username: string;

  @ApiProperty({
    name: 'password'
  })
  @prop({
    required: true,
    trim: true,
    select: false,
    get(value) { return value },
    set(value) { return value ? hashSync(value) : value }
  })
  password: string;
}

export { User };
