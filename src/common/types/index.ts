import { ERROR } from "../errors";

/**
 * Utility Types
 */

export type Merge<F, S> = {
  [k in keyof (F & S)]: k extends keyof S ? S[k] : k extends keyof F ? F[k] : never;
}

/**
 * Response Types
 */

export interface ResponseForm<T> {
  result: true;
  code: 1000;
  requestToResponse?: `${number}ms`;
  data: T;
}

export interface PaginationForm<T extends InitialPaginationResponseType> {
  result: true;
  code: 1000;
  requestToResponse?: `${number}ms`;
  data: PaginationResponseType<T>;
}

export interface PaginationResponseType<T extends InitialPaginationResponseType> {
  list: T['list'];
  count: T['count'];
  totalResult: number;
  totalPage: number;
  search?: string;
  page: number;
}

export interface InitialPaginationResponseType {
  list: any[];
  count: number;
}

export type Try<T> = ResponseForm<T>;
export type TryCatch<T, E extends ERROR> = ResponseForm<T> | E;
export type TryPagination<T extends InitialPaginationResponseType> = PaginationForm<T>;
export type TryCatchPagination<T extends InitialPaginationResponseType, E extends ERROR> = PaginationForm<T> | E;
