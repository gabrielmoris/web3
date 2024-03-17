import React, { useState } from "react";
import { token, canisterId, createActor } from "../../../declarations/token";
import { AuthClient } from "@dfinity/auth-client";
import { Principal } from "@dfinity/principal";

function Transfer() {
  const [recipientID, setRecipientID] = useState("");
  const [amount, setAmount] = useState("");
  const [btnText, setBtnText] = useState("Transfer");
  const [isTransfering, setIsTransfering] = useState(false);

  async function handleClick() {
    setIsTransfering(true);
    const recipient = Principal.fromText(recipientID);
    const amountToTransfer = Number(amount);

    // This only would work if the app is deployed inside the IC network, in local cant work, that is why I use the token instead
    // Deployment guideline is inside the README.md
    // Get the authClient from IC
    // const authClient = await AuthClient.create();
    // const identity = await authClient.getIdentity();

    // // Create the canister with the auth client to get the coins
    // const authenticatedCanister = createActor(canisterId, {
    //   agentOptions: {
    //     identity,
    //   },
    // });
    // const result = await authenticatedCanister.transfer(recipient, amountToTransfer);
    const res = await token.transfer(recipient, amountToTransfer);
    setBtnText(res);
    setIsTransfering(false);
    setTimeout(() => {
      setBtnText("Transfer");
      setAmount("");
      setRecipientID("");
    }, 5000);
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value={recipientID}
                onChange={(e) => {
                  setRecipientID(e.target.value);
                }}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button id="btn-transfer" onClick={handleClick} disabled={isTransfering}>
            {btnText}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Transfer;
