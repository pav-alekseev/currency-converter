import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid2";

const InputCurrency = ({ value, onChange }) => {
  const handleChange = (event) => {
    const { value } = event.target;

    if (/^\d+(\.\d+)?$/.test(value) || !value) {
      onChange(+value);
    }
  };

  return (
    <Grid size={{ xs: 12, sm: "grow" }}>
      <TextField
        label="Amount"
        variant="outlined"
        value={value}
        onChange={handleChange}
        fullWidth
      />
    </Grid>
  );
};

InputCurrency.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func,
};

export default InputCurrency;
