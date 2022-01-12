import React, { useEffect, useState, useContext } from 'react';
import '../App.css';
import * as fcl from '@onflow/fcl';
import FlowContext from '../context/FlowContext';

function EmeraldID(props) {
    const flow = useContext(FlowContext);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        fcl.currentUser().subscribe(flow.setUser);
        fcl.config()
            .put('discovery.wallet', 'https://flow-wallet.blocto.app/authn')
    }, []);

    useEffect(() => {
        if (flow.user && flow.user.loggedIn) {
            const wrap = async () => {
                let setup = await flow.checkEmeraldID();
                console.log(setup);
                if (!setup) {
                    createEmeraldID();
                } else {
                    setMessage("You have already set up your EmeraldID :)")
                }
            }

            wrap();
        }
    }, [flow.user]);

    const createEmeraldID = async () => {
        setMessage('Setting up your EmeraldID. Please wait ~30 seconds.');
        let response = await flow.createEmeraldID();
        if (response === 'Success') {
            setMessage('You have set up your EmeraldID.');
        } else {
            setMessage(response);
        }
    }

    return (
        <div className="App">
            {flow.user && flow.user.loggedIn && message 
                ? <h1>{message}</h1>
                : null}
            <button className="button-9" onClick={() => flow.authentication()}>{flow.user && !flow.user.loggedIn ? "Log in with Blocto" : "Log out"}</button>
        </div>
    );
}

export default EmeraldID;