export interface APIResponse<T> {
  data: T;
  status?: number;
  error?: unknown;
  code?: string
}

export interface TCallbacks<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: unknown) => void;
  onFinally?: () => void;
}
export interface TCallbacksParams<R, T> {
  params: R;
  onSuccess?: (data: T) => void;
  onError?: (error: unknown) => void;
  onFinally?: () => void;
}
