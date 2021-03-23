import { HttpException, Injectable, UseFilters, UseInterceptors,  } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ExceptionHandlingFilter } from 'src/shared/error-handling.filter';
import { ErrorDecorator } from 'src/shared/error.decorator';
import { ErrorInterceptor } from 'src/shared/error.interceptor';

@Injectable()
export class CronService {
  // @UseFilters(ExceptionHandlingFilter) Not works for this purpose
  // @UseInterceptors(new ErrorInterceptor()) Not works for this purpose
  @Cron('*/10 * * * * *')
  @ErrorDecorator() // Work!
  handleCron() {
    // throw new HttpException('Error emitted form Cron Service!!', 222);
    throw new Error('Error emitted form Cron Service!!');
  }
}
