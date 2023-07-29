import { useState, useEffect, useContext } from 'react';
import { gameSocket } from '../../api/socket';
import AuthContext from '../../contexts/authContext';

function TopBet() {
    const [result, setResult] = useState();
    const { getBet } = useContext(AuthContext);

    useEffect(() => {
        gameSocket.on('broadcastbet', (data) => {
            setResult(data.betPoint);
        });
    }, [])

    return (
        <section className="top-bet-wrap">
            <div className="container-fluid">
                <div className="row d-flex align-items-center justify-content-center">
                    <div className="col-lg-12 d-flex justify-content-between align-items-center">
                        <p className="point">Draw<span>{result}</span></p>
                        <p className="mb-0"> Bet = <span> {getBet.toString()}</span></p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TopBet;