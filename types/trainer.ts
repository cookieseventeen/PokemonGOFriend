export interface Trainer {
  name: string;
  id: string;
  qrCode?: string;
  timestamp?: string;
}

export interface SheetData {
  trainers: Trainer[];
  timestamp?: string;
}

export type SortOrder = 'asc' | 'desc';
