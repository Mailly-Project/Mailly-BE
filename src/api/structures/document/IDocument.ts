import { tags } from "typia";

export interface IDocument
  extends IDocument.IBase<null, null, null, null, null> {}

export namespace IDocument {
  export interface IBase<Publisher, Newsletter, Feed, Summary, Tags> {
    id: string & tags.Format<"uuid">;

    url: string & tags.Format<"url">;

    publisher: null | Publisher;
    published_at: string & tags.Format<"date-time">;

    newsletter: null | Newsletter;

    feed: null | Feed;

    summary: null | Summary;

    tags: null | Tags;
  }
}
