
export type YarsWithMultipleWinners = {
  years: Years[];
}

export type StudiosResponse = {
  studios: Studios[];
}

export type Years = {
  year: number;
  winnerCount: number;
}

export type Studios = {
  name: string;
  winCount: number;
}

export type IntervalResponse = {
  min: Interval[];
  max: Interval[];
}

export type Interval = {
  producer: string;
  interval: number;
  previousWin: number;
  followingWin: number;
}

export type MoviesByYearResponse = {
  id: number;
  year: number;
  title: string;
  studios?: string[];
  producers?: string[];
  winner: boolean;
}
