import { useState, useEffect, useContext } from 'react';
import { socket } from '../../api/socket';
import AuthContext from '../../contexts/authContext';

function Bet() {
    const [bet, setBet] = useState(0);
    const [timer, setTimer] = useState();
    const [currectUserId, setCurrectUserId] = useState();
    const { setGetBet } = useContext(AuthContext);

    useEffect(() => {
        socket.on('broadcasttime', (data) => {
            setTimer(data.timer);
        });
        socket.on('connect', function () {
            setCurrectUserId(socket.id);
        });
    }, [])

    const handleSendBet = () => {
        if (timer === 3 && bet !== 0) {
            const data = localStorage.getItem('user-data');
            const currectFormat = JSON.parse(data);
            const email = currectFormat.user.email;
            const betNumber = Number(bet);
            const betData = { betNumber, currectUserId, email }
            console.log(betData);
            socket.emit('bet', betData);
        }
        else if (timer === 0 && bet !== 0) {
            setBet(0);
        }
    }
    handleSendBet();

    setGetBet(bet);
    const handleBet = async (value) => {
        setBet(value);
    }
    const numbers = [1, 2, 3, 4, 5, 6, 12];

    return (
        <section className="bet-wrap">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12 col-12 text-center">
                        <p className="timer"><span>00:{('0' + timer).slice(-2)}</span></p>
                        <div className="bet-btn-cluster">
                            {
                                numbers.map((number, index) => {
                                    return <button key={index} disabled={timer === 3 || timer === 2 || timer === 1 || timer === 0} type="button" className="bet-btn" value={number} onClick={(e) => handleBet(e.target.value)}>{number}</button>
                                })
                            }
                            <button disabled={timer === 3 || timer === 2 || timer === 1 || timer === 0} className="bet-btn" onClick={() => setBet(0)}>Clear</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Bet;