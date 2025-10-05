import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule as NestConfigModule} from '@nestjs/config';
import * as Joi from 'joi';
@Module({
    imports: [NestConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        GEMINIAPIKEY: Joi.string().required(),
        PORT: Joi.number().default(3000),
      }),
      isGlobal: true,
    })],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
