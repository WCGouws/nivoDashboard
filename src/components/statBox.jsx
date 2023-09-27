import { Box, Typography, useTheme } from "@mui/material";
import { colorTokens } from "../theme";

const StatBox = ({ tilte, amount }) => {
  const theme = useTheme();
  const colors = colorTokens(theme.palette.mode);

  return (
    <Box width="100%" m="0 0px">
      <Box display="flex" justifyContent="center">
        <Typography variant="h4" fontWeight="bold" sx={{ color: colors.lightGray[300] }}>
          {tilte}
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center">
        <Typography variant="h5" sx={{ color: colors.gray[100] }}>
          {amount ? amount : "..."}
        </Typography>
      </Box>

    </Box>
  )
}

export default StatBox;