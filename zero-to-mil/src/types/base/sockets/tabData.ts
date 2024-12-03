export interface TabData {
  active: boolean;
  has_outrights: boolean;
  imageUrl: string;
  description: string;
  key: string;
  title: string;
}

export interface CarouselData {
  name: string;
  imageUrl?: string;
  icon: React.ComponentType<{ className?: string }>;
  value: string;
}
