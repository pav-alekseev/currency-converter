import PropTypes from "prop-types";

import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";

const SwitchCurrency = ({ onClick }) => {
  return (
    <Grid size={{ xs: 12, sm: "auto" }}>
      <Stack justifyContent="center" alignItems="center" height="100%">
        <IconButton color="primary" onClick={onClick}>
          <CompareArrowsIcon sx={{ fontSize: 30 }} />
        </IconButton>
      </Stack>
    </Grid>
  );
};

SwitchCurrency.propTypes = {
  onClick: PropTypes.func,
};

export default SwitchCurrency;
