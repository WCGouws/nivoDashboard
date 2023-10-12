import { Typography, Box, useTheme } from "@mui/material";
import { colorTokens } from "../theme";

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = colorTokens(theme.palette.mode);

  return (
    <Box mb="30px">
      <Typography variant="h2" color={theme.palette.mode == "dark" ? colors.lightGray[500] : "#A31F34"} fontWeight="bold" sx={{ mb: "5px" }}>
        {title}
      </Typography>
      <Typography variant="h5" color={colors.gray[300]}>
        {subtitle}
      </Typography>
    </Box>
  )
}

export default Header;