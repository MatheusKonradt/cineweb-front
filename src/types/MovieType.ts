
export interface MovieType {
  id: number;
  poster?: string;
  backdrop?: string;
  title: string;
  release: string;
  rating: number;
  votes: number;

  genres?: Array<{
    id: number;
    name: string;
  }>;
  overview?: string;
  video?: string;
}
