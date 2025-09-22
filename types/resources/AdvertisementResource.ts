export type AdvertisementResource = {
  id_advertisement: number;
  title: string;
  description: string;
  media: string | undefined;
  target_audience: string | null;
  start_date: string | null;
  end_date: string | null;
};
