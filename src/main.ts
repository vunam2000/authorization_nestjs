import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import CustomLogger from './modules/log/customLogger';
import getLogLevels from './utils/getLogLevels';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: getLogLevels(process.env.NODE_ENV === 'production'),
    bufferLogs: true
  });
  app.useLogger(app.get(CustomLogger));
  app.use(cookieParser());
  await app.listen(process.env.PORT);
}
bootstrap();
