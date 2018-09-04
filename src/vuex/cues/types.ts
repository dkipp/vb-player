export interface CuesState {
  tracks: Track[];
  activeTrackIds: string[];
  currentCueIds: string[];
  // selectedTrackId?: string;
  // selectedCueId?: string;
}

export interface Track {
  id: string;
  label: string;
  cues: Cue[];
}

export interface Cue {
  id: string;
  time: number;
  data: number;
}
