import { ERROR } from '.';

export interface TEST_ERROR extends ERROR {
  type: "business";
  result: false;
  code: 4000;
  data: '테스트용 에러 메시지 입니다.';
}
