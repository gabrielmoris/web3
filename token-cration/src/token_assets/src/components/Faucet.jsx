import React, { useState } from "react";
import { token, canisterId, createActor } from "../../../declarations/token";
import { AuthClient } from "@dfinity/auth-client";

function Faucet({ userPrincipal }) {
  const [isDisabled, setIsDisabled] = useState(false);
  const [butonText, setButtonText] = useState("Gimme gimme");

  async function handleClick(event) {
    setIsDisabled(true);

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
    // const result = await authenticatedCanister.payOut(10000);
    // /////////////////////////////////////
    const result = await token.payOut(10000);
    setButtonText(result);
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Get your free Rentio tokens here! Claim 10,000 RENTIO tokens to your account.</label>
      <span> Your wallet ID is: {userPrincipal}</span>
      <p className="trade-buttons">
        <button id="btn-payout" onClick={handleClick} disabled={isDisabled}>
          {butonText}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
