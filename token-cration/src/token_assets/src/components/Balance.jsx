import React, { useState } from "react";
import { Principal } from "@dfinity/principal";
import { token } from "../../../declarations/token";

function Balance() {
  const [inputValue, setInputValue] = useState("");
  const [balance, setBalance] = useState("");
  const [symbol, setSymbol] = useState("");

  async function handleClick() {
    const principal = Principal.fromText(inputValue);
    const balance = await token.balanceOf(principal);
    const sym = await token.getSymbol();
    setBalance(balance.toLocaleString());
    setSymbol(sym);
  }

  return (
    <div className="window white">
      <label>Check account token balance:</label>
      <p>
        <input
          id="balance-principal-id"
          type="text"
          placeholder="Enter a Principal ID"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
      </p>
      <p className="trade-buttons">
        <button id="btn-request-balance" onClick={handleClick}>
          Check Balance
        </button>
      </p>
      {balance && (
        <p>
          This account has a balance of {balance} {symbol}.
        </p>
      )}
    </div>
  );
}

export default Balance;
