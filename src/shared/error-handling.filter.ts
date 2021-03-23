import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class ExceptionHandlingFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {

    console.log('ExceptionHandlingFilter ', exception);
    // console.log('ExceptionHandlingFilter ', exception, host);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =  exception instanceof HttpException
     ? exception.getStatus()
     : HttpStatus.INTERNAL_SERVER_ERROR;

    response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}