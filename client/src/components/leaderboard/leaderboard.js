import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../contexts/authContext';
import usePrivateRoute from '../../hooks/usePrivateRoute';
import useRefreshToken from '../../hooks/useRefreshToken';


const _leaderboardURL = '/api/v1/leaderboard';

function Leaderboard() {
    const [users, setUsers] = useState();
    const privateRoute = usePrivateRoute();
    const refresh = useRefreshToken();
    const { auth } = useContext(AuthContext)

    useEffect(() => {
        const getUsers = async () => {
            try {
                const responce = await privateRoute.get(_leaderboardURL, {
                    withCredentials: true
                });
                setUsers(responce.data);
            } catch (error) {
                console.log(error);
            }
        }
        getUsers();
    }, [privateRoute])


    return (
        <section className="leaderboard-wrap">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        {
                            users?.length
                                ? (
                                    <ul className="leader-list-wrap">
                                        {
                                            users.sort((a, b) => (a.points > b.points) ? 1 : -1).reverse().map((user, i) => (
                                                <li key={i} className={ user.email === auth.user.email ?'currect-user' : ''}>
                                                    <div className="leaderboard-name-wrap">
                                                        <img src={user.picture} alt="" />
                                                        <p>{user.name}</p>
                                                    </div>
                                                    <div className="leaderboard-coin-wrap">
                                                        <img src={require('../../assets/image/coin.png')} alt="" />
                                                        <span>{user.points}</span>
                                                    </div>
                                                </li>
                                            )
                                            )}
                                    </ul>
                                ) : <>
                                    <p> no user found</p>
                                    <button onClick={()=> refresh()}>refresh</button>
                                </>
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Leaderboard;