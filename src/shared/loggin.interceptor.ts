import { ExecutionContext, Injectable, Logger } from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor  {
  intercept(context: ExecutionContext, call$: Observable<any>): Observable<any>{
    const req = context.switchToHttp().getRequest();
    const now = Date.now();
    const {method, url} = req;

    return call$.pipe(
      tap(() => Logger.log(`${method} ${url} ${Date.now() - now}ms`, context.getClass().name))
    )
  }
}