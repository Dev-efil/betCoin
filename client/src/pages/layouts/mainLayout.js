import { Outlet } from "react-router"
import Navbar from "../../components/navbar/navbar";
import TopNavbarComponent from '../../components/navbar/topNavbar';

function MainLayout() {
    return (
        <>
            <section className="leaderboard-wrap">
                <div className="container-fluid">
                    <div className="row d-flex align-items-center justify-content-center">
                        <TopNavbarComponent />
                    </div>
                </div>
            </section>
            <Outlet />
            <Navbar />
        </>
    )
}

export default MainLayout;