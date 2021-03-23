import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ExceptionHandlingFilter } from './shared/error-handling.filter';
import { ErrorInterceptor } from './shared/error.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.useGlobalFilters(new ExceptionHandlingFilter());
  // app.useGlobalInterceptors(new ErrorInterceptor());

  const config = new DocumentBuilder()
    .setTitle('Error Handling')
    .setDescription('Test to implements error handling service')
    .setVersion('1.0')
    .addTag('App')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);


  await app.listen(3000);
}
bootstrap();
