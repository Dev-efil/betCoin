import { NavLink } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="navigation">
            <ul>
                <li>
                    <NavLink to="/instruction">
                        <span className="icon">
                            <ion-icon name="information-circle-outline"></ion-icon>
                        </span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/">
                        <span className="icon">
                            <ion-icon name="home-outline"></ion-icon>
                        </span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/leaderboard">
                        <span className="icon">
                            <ion-icon name="podium-outline"></ion-icon>
                        </span>
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;