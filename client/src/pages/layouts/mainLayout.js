import { Outlet } from "react-router"
import NavbarComponent from "../../components/navbar/navbar";
import TopNavbarComponent from '../../components/navbar/topNavbar';

function MainLayout() {
    return (
        <>
            <TopNavbarComponent />
            <Outlet />
            <NavbarComponent />
        </>
    )
}

export default MainLayout;
