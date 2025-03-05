import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from "@nestjs/common";
import { Request, Response } from "express";
import { ERROR } from "../errors";

/**
 * A filter that handles HTTP exceptions and formats the error response.
 * Implements the `ExceptionFilter` interface.
 *
 * @class HttpExceptionFilter
 * @implements {ExceptionFilter}
 *
 * @author luke
 * @since 2025-03-02
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  /**
   * Handles the HTTP exception and formats the error response.
   *
   * error response example:
   * ```json
   * {
   *  "type": "http",
   *  "result": false,
   *  "code": 404,
   *  "path": "/api/v1/users",
   *  "data": "User not found",
   *  "timestamp": "2025-03-02T07:00:00.000Z",
   *  "response": {}
   * }
   * ```
   *
   * @param exception The exception that was thrown.
   * @param host The arguments host.
   *
   * @author luke
   * @since 2025-03-02
   *
   * @todo - 2025-03-02(luke): filter에 걸린 exception이 logging interceptor를 통해 로깅되도록 수정 필요
   * @todo - 2025-03-02(luke): error response의 data 필드에 대한 제 정의 필요.
   */
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const errorResponse = {
      type: "http",
      result: false,
      code: status,
      path: request.url,
      data: exception?.message || "",
      timestamp: new Date().toISOString(),
      response: exception?.getResponse() || {},
    } as ERROR;

    response.status(status).json(errorResponse);
  }
}
