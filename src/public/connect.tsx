import { Button, Grid, SvgIcon } from "@mui/material";
import { FC } from "react";
import { ReactComponent as MetamaskLogo } from "../assets/wallet/metamask.svg";
import { useMetamask } from "@thirdweb-dev/react";

const Connect: FC = () => {
  const connectWithMetamask = useMetamask();

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{
        minHeight: "100vh",
      }}
    >
      <Grid item>
        <Button
          variant="outlined"
          startIcon={
            <SvgIcon component={MetamaskLogo} inheritViewBox />
          }
          sx={{
            p: 2,
          }}
          onClick={connectWithMetamask}
        >
          Connect to Metamask
        </Button>
      </Grid>
    </Grid>
  )
}

export default Connect;
