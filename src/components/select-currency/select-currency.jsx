import PropTypes from "prop-types";

import Grid from "@mui/material/Grid2";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const SelectCurrency = ({ currency, onChange }) => {
  return (
    <Grid size="grow">
      <Select value={currency} onChange={onChange} fullWidth>
        <MenuItem key="currency_1" value="USD">
          USD
          {/* {CurrencyFactory.createCurrency(cur).getCurrencyInfo()} */}
        </MenuItem>
        <MenuItem key="currency_2" value="EUR">
          EUR
          {/* {CurrencyFactory.createCurrency(cur).getCurrencyInfo()} */}
        </MenuItem>
        <MenuItem key="currency_3" value="RUB">
          RUB
          {/* {CurrencyFactory.createCurrency(cur).getCurrencyInfo()} */}
        </MenuItem>
      </Select>
    </Grid>
  );
};

SelectCurrency.propTypes = {
  currency: PropTypes.string,
  onChange: PropTypes.func,
};

export default SelectCurrency;
