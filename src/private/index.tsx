import { AppBar, Box, Button, Grid, Toolbar, Typography } from "@mui/material";
import { useAddress, useDisconnect } from "@thirdweb-dev/react";
import { FC } from "react";
import { shortenAddress } from "../hooks/useDefiDuck";
import { Route, Routes } from "react-router-dom";
import Mint from "./mint";

const Private: FC = () => {
    const address = useAddress();
    const disconnectWallet = useDisconnect();

    return (
        <Grid>
            <AppBar
                sx={{
                    backgroundColor: "white"
                }}
            >
                <Toolbar>
                    <Typography
                        variant="h6"
                        color="primary"
                        sx={{
                            flexGrow: 1
                        }}
                    >
                        Defi Duck
                    </Typography>
                    <Typography
                        variant="body2"
                        color="primary"
                        sx={{
                            mr: 2,
                        }}
                    >
                        {shortenAddress(address)}
                    </Typography>
                    <Button
                        variant="outlined"
                        onClick={disconnectWallet}
                    >
                        Log Out
                    </Button>
                </Toolbar>
            </AppBar>
            <Box
                component='main'
                sx={{
                    flexGrow: 1,
                    pt: "96px",
                    mt: 3,
                    width: "100%",
                    minHeight: "100vh",
                }}
            >
                <Routes>
                    <Route path="/*" element={<Mint />} />
                </Routes>
            </Box>
        </Grid>
    )
}

export default Private;
