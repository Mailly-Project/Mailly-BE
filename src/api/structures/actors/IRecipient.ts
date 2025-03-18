import { tags } from "typia";
import { IUser } from "./IUser";
import { IMember } from "./IMember";

export interface IRecipient {
  user: null | IUser.IInvert;
  member: null | IMember.IInvert;
}

export namespace IRecipient {
  export interface IInvert {
    id: string & tags.Format<"uuid">;
    notification: null;
    created_at: string & tags.Format<"date-time">;
    deleted_at: (string & tags.Format<"date-time">) | null;
  }
}
