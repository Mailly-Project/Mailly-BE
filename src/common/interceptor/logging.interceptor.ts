import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { GlobalEnvironments } from "../../config/environments.config";

/**
 * An interceptor that logs the request and response of the application.
 *
 * @class LoggingInterceptor
 * @implements {NestInterceptor}
 *
 * @author luke
 * @since 2025-03-01
 */
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  /**
   * Intercepts the request and response of the application.
   *
   * @param context The execution context of the application.
   * @param next The next handler to be executed
   *
   * @returns The observable of the response.
   *
   * @todo - 2025-03-01(luke): 서버 모드별 로깅 설정 추가 필요.
   */
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const { path } = request;

    return next.handle().pipe(
      tap((response: any) => {
        if (GlobalEnvironments.mode.toString() !== "test") {
          const requestToResponse: `${number}ms` = `${Date.now() - request.now}ms`;
          console.log(`
              Logging
              ${request.method} ${path} ${requestToResponse}
              CurrentTime : ${new Date()}
              Request : ${JSON.stringify(request.body, null, 2)}
              Response : ${JSON.stringify(response, null, 2)}
            `);
        }
      })
    );
  }
}
