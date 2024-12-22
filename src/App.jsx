import { useState } from "react";

import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid2";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { LineChart } from "@mui/x-charts/LineChart";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { amber } from "@mui/material/colors";

import SelectCurrency from "./components/select-currency/select-currency";
import SwitchCurrency from "./components/switch-currency/switch-currency";
import CurrencyFactory from "./utils/currencies";
import useRate from "./hooks/useRate";
import InputCurrency from "./components/input-currency/input-currency";

const App = () => {
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [quoteCurrency, setQuoteCurrency] = useState("RUB");
  const [amount, setAmount] = useState(1);

  const theme = createTheme({
    palette: {
      background: {
        default: amber[100],
      },
    },
  });

  const baseCurrencyInfo = CurrencyFactory.createCurrency(baseCurrency);
  const quoteCurrencyInfo = CurrencyFactory.createCurrency(quoteCurrency);

  const switchCurrencies = () => {
    const temp = baseCurrency;
    setBaseCurrency(quoteCurrency);
    setQuoteCurrency(temp);
  };

  const handleChangeBaseCurrency = (event) => {
    const currency = event.target.value;

    if (currency === quoteCurrency) {
      switchCurrencies();
    } else {
      setBaseCurrency(currency);
    }
  };

  const handleChangeQuoteCurrency = (event) => {
    const currency = event.target.value;

    if (currency === baseCurrency) {
      switchCurrencies();
    } else {
      setQuoteCurrency(currency);
    }
  };

  const { rate, historicalData, isLoading, error } = useRate(
    baseCurrency,
    quoteCurrency
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Container
          maxWidth="sm"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            padding: 3,
            borderRadius: 6,
            backgroundColor: "white",
          }}
        >
          <Typography variant="h1" sx={{ fontSize: 36 }} textAlign="center">
            Currency Converter
          </Typography>
          {(() => {
            if (error) {
              return (
                <Typography xs={{ fontSize: 24 }} textAlign="center">
                  {error}
                </Typography>
              );
            }

            return (
              <>
                <Grid container spacing={{ xs: 1, md: 2 }}>
                  <InputCurrency value={amount} onChange={setAmount} />
                  <SelectCurrency
                    currency={baseCurrency}
                    onChange={handleChangeBaseCurrency}
                  />
                  <SwitchCurrency onClick={switchCurrencies} />
                  <SelectCurrency
                    currency={quoteCurrency}
                    onChange={handleChangeQuoteCurrency}
                  />
                </Grid>
                <Stack>
                  <Typography>
                    {amount} {baseCurrencyInfo.getCurrencyInfo()} =
                  </Typography>
                  <Typography sx={{ fontSize: 24, fontWeight: "bold" }}>
                    {isLoading
                      ? "Курс загружается"
                      : `${
                          rate * amount
                        } ${quoteCurrencyInfo.getCurrencyInfo()}`}
                  </Typography>
                </Stack>
                <Stack gap={2} mt={4}>
                  <Typography
                    variant="h2"
                    textAlign="center"
                    sx={{ fontSize: 24 }}
                  >
                    Exchange Rate History (7 days)
                  </Typography>
                  <LineChart
                    xAxis={
                      isLoading
                        ? []
                        : [
                            {
                              scaleType: "point",
                              data: historicalData.map(({ date }) => date),
                            },
                          ]
                    }
                    series={
                      isLoading
                        ? []
                        : [
                            {
                              data: historicalData.map(({ value }) => value),
                              label: `${baseCurrencyInfo.name} to ${quoteCurrencyInfo.name}`,
                            },
                          ]
                    }
                    width={500}
                    height={300}
                    loading={isLoading}
                  />
                </Stack>
              </>
            );
          })()}
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default App;
