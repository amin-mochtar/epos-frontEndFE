export type noticeBarType = {
  message: string;
  type: 'WARNING' | 'BLOCKED' | 'INFO';
  img?: boolean | undefined;
  placeholder?: string;
  url?: string | undefined;
};
