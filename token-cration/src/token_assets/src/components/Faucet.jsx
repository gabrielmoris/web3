import React, { useState } from "react";
import { token } from "../../../declarations/token";

function Faucet() {
  const [isDisabled, setIsDisabled] = useState(false);
  const [butonText, setButtonText] = useState("Gimme gimme");

  async function handleClick(event) {
    setIsDisabled(true);
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
      <p className="trade-buttons">
        <button id="btn-payout" onClick={handleClick} disabled={isDisabled}>
          {butonText}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
