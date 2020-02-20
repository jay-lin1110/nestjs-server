import { Module, Global } from '@nestjs/common';
import { MongoService } from './mongo.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from './models/user.model';

const models = TypegooseModule.forFeature([User])

@Global()
@Module({
  imports: [
    TypegooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGO_URI,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      })
    }),
    models,
  ],
  providers: [MongoService],
  exports: [MongoService, models],
})
export class MongoModule { }
