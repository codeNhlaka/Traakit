import { useState } from 'react';

function ConfirmAccount(){
    // confirm account then sign user in

    function confirmAccount(){
        alert('SUCCESS!')
    }

    return (
        <div>
            <h1>Confirm Account Component</h1>
            <button onClick={() => confirmAccount()} >Confirm Account</button>
        </div>
    )
}

export default ConfirmAccount;