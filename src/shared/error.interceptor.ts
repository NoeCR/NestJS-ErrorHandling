import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";



@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  // intercept(context: ExecutionContext, call$: Observable<any>): Observable<any> {
  //   return call$
  //     // .handle()
  //     .pipe(tap(value => console.log));
  // }
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('ErrorInterceptor >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    return next
      .handle()
      .pipe(
        tap(value => console.log('ErrorInterceptor ', value)),
        catchError(err => throwError(new Error('Error inside of ErrorInterceptor'))),
      );
  }
}