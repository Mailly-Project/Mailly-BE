import { tags } from "typia";
import { IUser } from "./IUser";
import { IMember } from "./IMember";

export interface ISubscriber extends ISubscriber.IInvert {
  user: null | IUser.IInvert;
  member: null | IMember.IInvert;
}

export namespace ISubscriber {
  export interface IInvert {
    id: string & tags.Format<"uuid">;

    topic: null;
    publisher: null;
    newsletter: null;

    created_at: string & tags.Format<"date-time">;
  }
}
