export type HeroItem = {
  id: string;
  title: string;
  description: string;
  backgroundImage: string;
  href?: string;

  mode?: "banner" | "event";

  badge?: string;
  location?: string;
  date?: string;

  coupon?: string;

  eventStart?: string; // ISO date for countdown

  btnText?: string;
};