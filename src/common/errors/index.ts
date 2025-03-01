import { Merge } from "../types";

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