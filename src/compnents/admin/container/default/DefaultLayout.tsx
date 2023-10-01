import {Outlet} from "react-router-dom";
import { Container } from "@mui/material";
import HomeHeader from "../../../home/HomeHeader";

const DefaultLayout = () => {
    return (
        <main>
            <HomeHeader />
            <Container>
                <Outlet/>
            </Container>
            
        </main>
    );
}

export default DefaultLayout;