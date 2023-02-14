import { useState, useEffect } from 'react';
import { socket } from '../../api/socket';

const TopNavbar = () => {
    const [userCount, setUserCount] = useState();
    const userData = localStorage.getItem('user-data');
    let data = JSON.parse(userData);

    useEffect(() => {
        socket.on('usercount', (data) => {
            setUserCount(data.allClient.length);
        });
    }, [])

    return (
        <div className="col-lg-12 d-flex align-items-center justify-content-between topnavbar-padding">
            <div className="d-flex align-items-center">
                <img className="profile-img" src={data.user.url} alt="" />
                <p className="profile-name">{data.user.name}</p>
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
    )
}

export default TopNavbar;