import { tags } from "typia";
import { IUser } from "./IUser";
import { IDevice } from "./IDevice";

export interface IMember extends IMember.IInvert {
  user: null | IUser;

  reader: null;
  subscriber: null;
  recipent: null;

  device: null | IDevice.IInvert[];
}

export namespace IMember {
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
