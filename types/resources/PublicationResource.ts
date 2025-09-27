export type PublicationResource = {
  id_publication: number;
  title: string;
  content: string;
  media: string | null;
  media_type: string;
  likes_count: number;
  user_liked: boolean;
  comments_count: number;
  views_count: number;
  shares_count: number;
  created_at: string;
  updated_at: string;
};
