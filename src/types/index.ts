export type BaseEntity = {
  id: string;
  createdAt: string;
  modifiedAt: string;
};

export type ApiResponse<T> = {
  count: string | null
  next: string | null;
  previous: string | null;
  results: T[];
};
