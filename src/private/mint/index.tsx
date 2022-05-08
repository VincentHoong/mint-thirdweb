import {
    Button,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Typography,
} from "@mui/material";
import { FC, useEffect, useMemo, useState } from "react";
import { useAddress, useNFTDrop } from "@thirdweb-dev/react";
import { NFTMetadataOwner } from "@thirdweb-dev/sdk";
import { useSnackbar } from "notistack";
import { shortenAddress } from "../../hooks/useDefiDuck";

const Mint: FC = () => {
    const address = useAddress();
    const { enqueueSnackbar } = useSnackbar();
    const [nfts, setNfts] = useState<NFTMetadataOwner[]>([]);
    const [isReadNft, setIsReadNft] = useState<boolean>(false);
    const nftDrop = useNFTDrop(process.env.REACT_APP_CONTRACT_ADDRESS);
    const hasOwnedNft = useMemo(() => {
        return nfts.some((nft) => {
            return nft.owner === address;
        })
    }, [nfts]);

    const getNfts = async () => {
        try {
            setIsReadNft(false);
            if (nftDrop) {
                const _nfts = await nftDrop.getAllClaimed();
                setNfts(_nfts);
                setIsReadNft(true);
            } else {
                throw "No Contract Available!";
            }
        } catch (error: any) {
            enqueueSnackbar(error?.data?.message || error?.message || error || "Please make sure the network is correct", {
                variant: "error",
            });
        }
    }

    const mintNft = async () => {
        try {
            if (nftDrop) {
                await nftDrop.claim(1);
                enqueueSnackbar("Successfully Claimed");
            } else {
                throw "No Minting Available!";
            }
        } catch (error: any) {
            enqueueSnackbar(error?.data?.message || error?.message || error || "Please make sure the network is correct", {
                variant: "error",
            });
        }
    }

    useEffect(() => {
        getNfts();
    }, [address]);

    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
        >
            {
                nfts.map((nft, nftKey) => {
                    return (
                        <Grid item xs={12} sm={3} key={nftKey}>
                            <Card sx={{ maxWidth: 345, mx: "auto" }}>
                                <CardMedia
                                    component="img"
                                    image={nft.metadata.image}
                                    alt={nft.metadata.name}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {nft.metadata.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" component="div">
                                        {shortenAddress(nft.owner)}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        {nft.metadata.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    )
                })
            }
            {
                isReadNft && (
                    <Grid item xs={12}
                        sx={{
                            textAlign: "center",
                            mt: 5,
                        }}>
                        {
                            hasOwnedNft ?
                                (
                                    <Typography variant="h5" color="text.primary">
                                        Congratulation on minting your NFT!
                                        <br />
                                        To the moon! 🚀
                                    </Typography>
                                ) :
                                (
                                    process.env.REACT_APP_OWNER_ADDRESS === address && (
                                        <Button
                                            variant="outlined"
                                            onClick={mintNft}
                                            sx={{
                                                p: 2
                                            }}
                                        >
                                            Click Here to Mint
                                        </Button>
                                    )
                                )
                        }
                    </Grid>
                )
            }
        </Grid>
    )
}

export default Mint;
