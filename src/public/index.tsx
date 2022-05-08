import { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router";
import Connect from "./connect";
import { useAddress } from "@thirdweb-dev/react";

const Public = () => {
    const navigate = useNavigate();
    const address = useAddress();
    const { pathname } = useLocation();

    useEffect(() => {
        if (!address && pathname === "/") {
            navigate("/connect");
        }
    }, [pathname, navigate, address]);

    return (
        <Routes>
            <Route path="/connect" element={<Connect />} />
        </Routes>
    );
};

export default Public;
