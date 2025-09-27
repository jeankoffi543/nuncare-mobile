import { SubscriberResource } from './SubscriberResource';

export type CommentResource = {
  id_comment: number;
  id_publication: number;
  subscriber: SubscriberResource;
  content: string;
  created_at: string;
  updated_at: string;
};
