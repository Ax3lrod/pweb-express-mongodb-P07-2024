export type ApiResponse = {
  status: "failed" | "error" | "success";
  message: string;
  date?: string;
  data?: Record<string, any> | any[];
};
