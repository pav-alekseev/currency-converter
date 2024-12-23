import PropTypes from "prop-types";

import Grid from "@mui/material/Grid2";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CurrencyFactory, { currencies } from "../../utils/currencies";

const SelectCurrency = ({ currency, onChange }) => {
  return (
    <Grid size={{ xs: 12, sm: "grow" }}>
      <Select value={currency} onChange={onChange} fullWidth>
        {currencies.map((currency) => (
          <MenuItem key={currency} value={currency}>
            {CurrencyFactory.createCurrency(currency).getCurrencyInfo()}
          </MenuItem>
        ))}
      </Select>
    </Grid>
  );
};

SelectCurrency.propTypes = {
  currency: PropTypes.string,
  onChange: PropTypes.func,
};

export default SelectCurrency;
