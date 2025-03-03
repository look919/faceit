interface Performer {
  name: string;
  avatar: string;
  score: number | string;
}

export type Achievement = {
  title: string;
  subtitle: string;
  description: string;
  performers: [Performer, Performer, Performer];
};
