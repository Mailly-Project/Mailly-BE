import { tags } from "typia";
import { IUser } from "./IUser";
import { IMember } from "./IMember";

export interface IReader extends IReader.IInvert {
  user: null | IUser.IInvert;
  member: null | IMember.IInvert;
}

export namespace IReader {
  export interface IInvert {
    id: string & tags.Format<"uuid">;

    feed: null;

    created_at: string & tags.Format<"date-time">;
  }
}
