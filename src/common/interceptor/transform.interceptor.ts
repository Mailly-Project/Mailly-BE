import {
  InitialPaginationResponseType,
  PaginationForm,
  ResponseForm,
} from "../types";

/**
 * Calculate the total number of results and total number of pages.
 *
 * @param {number} totalCount - The total number of items.
 * @param {number} limit - The number of items per page.
 * @returns {{ totalResult: number; totalPage: number }} An object containing the total number of results and total number of pages.

 *
 * @author luke
 * @since 2025.03.02
 */
const listTotalCount = (
  totalCount: number = 0,
  limit: number = 0,
): { totalResult: number; totalPage: number } => {
  const totalResult = totalCount;
  const totalPage =
    totalResult % limit === 0
      ? totalResult / limit
      : Math.floor(totalResult / limit) + 1;
  return { totalResult, totalPage };
};

/**
 * Creates a pagination form response object.
 *
 * @template ResponseType - The type of the response data that extends InitialPaginationResponseType.
 * @param {ResponseType} responseDate - The response data containing the list and count.
 * @param {Object} paginationInfo - The pagination information.
 * @param {number} paginationInfo.limit - The limit of items per page.
 * @param {number} paginationInfo.page - The current page number.
 * @param {string} [paginationInfo.search] - The optional search query.
 * @param {`${number}ms`} [requestToResponse] - The optional request to response time in milliseconds.
 * @returns {PaginationForm<ResponseType>} The pagination form response object.
 *
 * @author luke
 * @since 2025.03.02
 */
export function createPaginationForm<
  ResponseType extends InitialPaginationResponseType,
>(
  responseDate: ResponseType,
  paginationInfo: { limit: number; page: number; search?: string },
  requestToResponse?: `${number}ms`,
): PaginationForm<ResponseType> {
  const { limit, page, search } = paginationInfo;
  const { totalPage, totalResult } = listTotalCount(responseDate.count, limit);

  return {
    result: true,
    code: 1000,
    requestToResponse,
    data: {
      list: responseDate.list,
      count: responseDate.count,
      page,
      totalResult,
      totalPage,
      search,
    },
  };
}

/**
 * Creates a response form object with the provided data and optional request-to-response time.
 *
 * @template T - The type of the data to be included in the response form.
 * @param {T} data - The data to be included in the response form.
 * @param {`${number}ms`} [requestToResponse] - Optional request-to-response time in milliseconds.
 * @returns {ResponseForm<T>} The response form object containing the result, code, request-to-response time, and data.
 *
 * @author luke
 * @since 2025.03.02
 */
export function createResponseForm<T>(
  data: T,
  requestToResponse?: `${number}ms`,
): ResponseForm<T> {
  return {
    result: true,
    code: 1000,
    requestToResponse,
    data,
  } as const;
}
