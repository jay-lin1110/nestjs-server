import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, MinLength, IsNotEmpty } from 'class-validator'


class AuthDto {
  @ApiProperty({
    name: 'username',
    example: 'daisy'
  })
  @MaxLength(16)
  @MinLength(1, {
    message: '请输入尊名。'
  })
  username: string;

  @ApiProperty({
    name: 'password',
    example: 'daisy'
  })
  @IsNotEmpty({
    message: '请填写密码！'
  })
  password: string;
}

export { AuthDto };


