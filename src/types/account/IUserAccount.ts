import { tags } from "typia";

export interface IUserAccount extends IUserAccount.IInvert {
  member: null;

  reader: null;
  subscriber: null;
  recipent: null;

  device: null;
}

export namespace IUserAccount {
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
