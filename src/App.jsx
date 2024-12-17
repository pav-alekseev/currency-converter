import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid2";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { amber } from "@mui/material/colors";
import { LineChart } from "@mui/x-charts/LineChart";

import SelectCurrency from "./components/select-currency/select-currency";
import SwitchCurrency from "./components/switch-currency/switch-currency";

const App = () => {
  const theme = createTheme({
    palette: {
      background: {
        default: amber[100],
      },
    },
  });

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
          <Grid container spacing={{ xs: 1, md: 2 }}>
            <SelectCurrency
              currency="RUB"
              onChange={() => {
                console.log("on change");
              }}
            />
            <SwitchCurrency />
            <SelectCurrency
              currency="USD"
              onChange={() => {
                console.log("on change");
              }}
            />
          </Grid>
          <Stack>
            <Typography>1 USD =</Typography>
            <Typography sx={{ fontSize: 24, fontWeight: "bold" }}>
              500 RUB
            </Typography>
          </Stack>
          <Stack gap={2} mt={4}>
            <Typography variant="h2" textAlign="center" sx={{ fontSize: 24 }}>
              Exchange Rate History (7 days)
            </Typography>
            <LineChart
              xAxis={[{ scaleType: "point", data: [1, 2, 3, 4].map((d) => d) }]}
              series={[
                {
                  data: [1, 2, 3, 4].map((d) => d),
                  label: `Rate (RUB to USD)`,
                },
              ]}
              width={500}
              height={300}
            />
          </Stack>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default App;
