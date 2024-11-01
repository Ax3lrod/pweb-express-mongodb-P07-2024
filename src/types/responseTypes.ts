export type ApiResponse = {
  status: "failed" | "error" | "success";
  message: string;
  data: Record<string, any> | any[];
};
