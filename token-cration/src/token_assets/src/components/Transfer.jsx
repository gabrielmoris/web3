import React, { useState } from "react";
import { token } from "../../../declarations/token";
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
