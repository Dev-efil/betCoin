function Leaderboard() {
    const userData = localStorage.getItem('user-data');
    let image = JSON.parse(userData);
    return (
        <section className="leaderboard-wrap">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <ul>
                            <li className="winner">
                                <div className="leaderboard-name-wrap">
                                    <img src={image.user.url} alt="" />
                                    <p>{image.user.name}</p>
                                </div>
                                <div className="leaderboard-coin-wrap">
                                    <img src={require('../assets/image/coin.png')} alt="" />
                                    <span>5.5K</span>
                                </div>
                            </li>
                            <li className="silver">
                                <div className="leaderboard-name-wrap">
                                    <img src={image.user.url} alt="" />
                                    <p>{image.user.name}</p>
                                </div>
                                <div className="leaderboard-coin-wrap">
                                    <img src={require('../assets/image/coin.png')} alt="" />
                                    <span>5.5K</span>
                                </div>
                            </li>
                            <li className="bronze">
                                <div className="leaderboard-name-wrap">
                                    <img src={image.user.url} alt="" />
                                    <p>{image.user.name}</p>
                                </div>
                                <div className="leaderboard-coin-wrap">
                                    <img src={require('../assets/image/coin.png')} alt="" />
                                    <span>5.5K</span>
                                </div>
                            </li>
                            <li>
                                <div className="leaderboard-name-wrap">
                                    <img src={image.user.url} alt="" />
                                    <p>{image.user.name}</p>
                                </div>
                                <div className="leaderboard-coin-wrap">
                                    <img src={require('../assets/image/coin.png')} alt="" />
                                    <span>5.5K</span>
                                </div>
                            </li>
                            <li>
                                <div className="leaderboard-name-wrap">
                                    <img src={image.user.url} alt="" />
                                    <p>{image.user.name}</p>
                                </div>
                                <div className="leaderboard-coin-wrap">
                                    <img src={require('../assets/image/coin.png')} alt="" />
                                    <span>5.5K</span>
                                </div>
                            </li>
                            <li>
                                <div className="leaderboard-name-wrap">
                                    <img src={image.user.url} alt="" />
                                    <p>{image.user.name}</p>
                                </div>
                                <div className="leaderboard-coin-wrap">
                                    <img src={require('../assets/image/coin.png')} alt="" />
                                    <span>5.5K</span>
                                </div>
                            </li>
                            <li>
                                <div className="leaderboard-name-wrap">
                                    <img src={image.user.url} alt="" />
                                    <p>{image.user.name}</p>
                                </div>
                                <div className="leaderboard-coin-wrap">
                                    <img src={require('../assets/image/coin.png')} alt="" />
                                    <span>5.5K</span>
                                </div>
                            </li>
                            <li>
                                <div className="leaderboard-name-wrap">
                                    <img src={image.user.url} alt="" />
                                    <p>{image.user.name}</p>
                                </div>
                                <div className="leaderboard-coin-wrap">
                                    <img src={require('../assets/image/coin.png')} alt="" />
                                    <span>5.5K</span>
                                </div>
                            </li>
                            <li>
                                <div className="leaderboard-name-wrap">
                                    <img src={image.user.url} alt="" />
                                    <p>{image.user.name}</p>
                                </div>
                                <div className="leaderboard-coin-wrap">
                                    <img src={require('../assets/image/coin.png')} alt="" />
                                    <span>5.5K</span>
                                </div>
                            </li>
                            <li className="currect-user">
                                <div className="leaderboard-name-wrap">
                                    <img src={image.user.url} alt="" />
                                    <p>{image.user.name}</p>
                                </div>
                                <div className="leaderboard-coin-wrap">
                                    <img src={require('../assets/image/coin.png')} alt="" />
                                    <span>5.5K</span>
                                </div>
                            </li>
                            <li>
                                <div className="leaderboard-name-wrap">
                                    <img src={image.user.url} alt="" />
                                    <p>{image.user.name}</p>
                                </div>
                                <div className="leaderboard-coin-wrap">
                                    <img src={require('../assets/image/coin.png')} alt="" />
                                    <span>5.5K</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Leaderboard;