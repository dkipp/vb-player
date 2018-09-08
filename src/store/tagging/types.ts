export interface TaggingState {
  tags: Tag[];
  // activeTrackIds: string[];
  currentTagIds: string[]; // like at the currentTime
  // selectedTrackId?: string;
  // selectedCueId?: string;
}

export interface Tag {
  id: string;
  time: number;
  data: number;
}
