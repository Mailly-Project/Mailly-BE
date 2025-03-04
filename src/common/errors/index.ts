import { Merge } from "../types";

/**
 * Error Types
 * 
 * [고민] 
 * - ERROR 타입의 code는 number가 맞는가?
 *   - number가 맞다면 어떤 의미를 가지고 그 의미를 어떻게 정의할 것인가.
 *   - string이 였다면 어떨까?
 */
export interface ERROR {
  type: string;
  result: false;
  code: number;
  data: string;
}

export const isBusinessError = (obj: any): obj is Merge<ERROR, { type: 'business' }> => {
	if (isError(obj) && obj.type === 'business') {
		return true;
	}
	return false;
};

export const isError = (obj: any): obj is ERROR => {
	if (obj.result === false) {
		return true;
	}
	return false;
};