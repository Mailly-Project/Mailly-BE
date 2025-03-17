import { tags } from "typia";

export interface IDevice extends IDevice.IInvert {
  id: string & tags.Format<"uuid">;

  created_at: string & tags.Format<"date-time">;

  updated_at: string & tags.Format<"date-time">;
}

export namespace IDevice {
  export type IDeviceType = "Android" | "iOS";

  export interface IInvert {
    device_id: string;
    type: IDeviceType;
  }
}
