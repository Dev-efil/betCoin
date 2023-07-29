import { useState, useEffect, useContext } from 'react';
import { gameSocket } from '../../api/socket';
import AuthContext from '../../contexts/authContext';

// import useSocket from '../../hooks/useSocket';

const TopNavbar = () => {
    const [userCount, setUserCount] = useState();
    const { auth } = useContext(AuthContext);
    let data = auth.user;
    // useSocket();
    useEffect(() => {
        gameSocket.on('usercount', (data) => {
            setUserCount(data.allClient.length);
            console.log("count",data.allClient.length);
        });
   
        gameSocket.emit('test', gameSocket.id);
        // testSocket.emit('tests', testSocket.id);

    }, [])

    return (
        <section className="top-navbar-wrap">
            <div className="container-fluid">
                <div className="row d-flex align-items-center justify-content-center">
                    <div className="col-lg-12 d-flex align-items-center justify-content-between top-navbar-padding">
                        <div className="d-flex align-items-center">
                            <img className="profile-img" src={data.url} alt="" />
                            <p className="profile-name">{data.name}</p>
                        </div>
                        <div className="d-flex align-items-end flex-column">
                            <div className="live-user-wrap">
                                <div className="live-wrap">
                                    <div className="live-text">Live</div>
                                    <div className="imso_li__live-ind-mask">
                                        <div className="imso_li__live-ind-wrap">
                                            <div className="imso_li__live-ind-var"></div>
                                        </div>
                                    </div>
                                </div> Players = <span>{userCount}</span>
                            </div>
                            <div className="coin-wrap">
                                <img src={require('../../assets/image/coin.png')} alt="" />
                                <span>5.2K</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TopNavbar;
