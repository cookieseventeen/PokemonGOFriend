export interface Trainer {
  name: string;
  id: string;
  qrCode?: string;
}

export interface SheetData {
  trainers: Trainer[];
}
