/**
 * Utility Types
 */

export type Merge<F, S> = {
  [k in keyof (F & S)]: k extends keyof S ? S[k] : k extends keyof F ? F[k] : never;
}

/**
 * Response Types
 */

interface ResponseForm<T> {
  result: true;
  code: 1000;
  requestToResponse?: `${number}ms`;
  data: T;
}