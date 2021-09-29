const types = ["info", "warning", "error", "success"] as const;
export type Toast = {
  id: string;
  text: string;
  type: typeof types[number];
};
