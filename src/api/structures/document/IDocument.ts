import { DeepStrictMerge } from "@kakasoo/deep-strict-types";
import { tags } from "typia";

export interface IDocument extends IDocument.IInvert {
  publisher: null;
  newsletter: null;

  feed: null;
  summary: null;
  tags: null;
}

export namespace IDocument {
  /**
   * Invert information
   */
  export interface IInvertBase {
    id: string & tags.Format<"uuid">;
    url: string & tags.Format<"url">;
    published_at: string & tags.Format<"date-time">;
    created_at: string & tags.Format<"date-time">;
  }

  export type IInvert<Extra extends object = {}> = DeepStrictMerge<
    IInvertBase,
    Extra
  >;
}
