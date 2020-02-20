import { Module, Global } from '@nestjs/common';
import { CommonService } from './common.service';
import { ConfigModule } from '@nestjs/config';
import { MongoModule } from '@libs/mongo';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongoModule
  ],
  providers: [CommonService],
  exports: [CommonService, MongoModule],
})
export class CommonModule { }
