import { tags } from "typia";
import { IMember } from "./IMember";
import { IDevice } from "./IDevice";
import { IReader } from "./IReader";

export interface IUser extends IUser.IInvert {
  member: null | IMember.IInvert;

  reader: null | IReader.IInvert[];
  subscriber: null;
  recipent: null;

  device: null | IDevice.IInvert;
}

export namespace IUser {
  /**
   * Invert information of User
   */
  export interface IInvert {
    /**
     * Primary Key
     */
    id: string & tags.Format<"uuid">;

    /**
     * random user name
     */
    name: string & tags.MinLength<255>;

    /**
     * Creation time of record
     */
    created_at: string & tags.Format<"date-time">;

    /**
     * Update time of record
     */
    updated_at: string & tags.Format<"date-time">;
  }
}
