import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

export class LogInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const startDate = Date.now();

    const request = context.switchToHttp().getRequest();
    return next.handle().pipe(
      tap(() => {
        Logger.log(
          `${request.method} ${request.url} +${Date.now() - startDate} ms`,
        );
      }),
    );
  }
}
