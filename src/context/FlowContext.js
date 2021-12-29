import React, { useState, useEffect } from 'react';
import * as fcl from '@onflow/fcl';

const Context = React.createContext({});

function Provider(props) {
    const [user, setUser] = useState();

    const authentication = async () => {
        if (user && user.addr) {
            fcl.unauthenticate();
        } else {
            fcl.authenticate();
        }
    }

    const sendAuthPOST = async () => {
        // Gets the id in the URL
        let search = window.location.search;
        let params = new URLSearchParams(search);
        let id = params.get('id');
        let guildID = params.get('guildID');

        console.log(user)
        const response = await fetch('https://damp-ridge-15827.herokuapp.com/api/join', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user, uuid: id, guildID: guildID }),
        });
    }

    useEffect(() => {
        fcl.currentUser().subscribe(setUser);
    }, []);

    return (
        <Context.Provider
            value={{
                sendAuthPOST,
                user,
                setUser,
                authentication,
                fcl
            }}
        >
            {props.children}
        </Context.Provider>
    );
}

export {
    Context as default,
    Provider
};