import { Box } from "@mui/material";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const FullScreenLayout = ({ children }: Props) => {
  return (
    <Box>
      <>{children}</>
    </Box>
  );
};

export { FullScreenLayout };
