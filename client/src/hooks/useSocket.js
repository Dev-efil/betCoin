import { useContext, useEffect } from "react";
import { gameSocket } from '../api/socket';
import AuthContext from "../contexts/authContext";

const useSocket = () => {
    const { setAuth } = useContext(AuthContext);
    useEffect(() => {
        gameSocket.connect();
        gameSocket.on("connect_error", () => {
            setAuth('');
        })
        return () => {
            gameSocket.off('connect_error');
        }
    }, [setAuth])
}

export default useSocket;