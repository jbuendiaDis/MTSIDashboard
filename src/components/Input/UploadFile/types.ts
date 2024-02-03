export interface UploadFileProps {
  onChange: (value: { url: string; file: File }[]) => void;
  values: { url: string; file: File }[];
  max?: number;
  multiple: boolean;
  label: string;
  name?: string;
  error?: boolean;
  helperText?: any;
  helperTextProps?: any;
}

export interface ImagePreviewProps {
  src: any;
  onRemove: any;
  color?: any;
  index: any;
}
