export interface Exception {
  status: number;
  message: string;
  code?: string;
  timestamp?: string;
  path?: string;
}
