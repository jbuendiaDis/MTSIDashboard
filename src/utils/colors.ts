export const hexToRgba = (hex: string, alpha: number = 1): string => {
  let color: string = hex;

  if (hex.length === 4) {
    color += `${hex[1]}${hex[2]}${hex[3]}`;
  }

  const r: number = parseInt(color.slice(1, 3), 16);
  const g: number = parseInt(color.slice(3, 5), 16);
  const b: number = parseInt(color.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
