import React, { useEffect, useState } from "react";
import { HttpAgent, Actor } from "@dfinity/agent";
import { idlFactory } from "../../../declarations/nft";
import { Principal } from "@dfinity/principal";
import Button from "./Button";
import { opend } from "../../../declarations/opend";

function Item({ id }) {
  const [name, setName] = useState();
  const [owner, setOwner] = useState();
  const [img, setImg] = useState();
  const [button, setButton] = useState();
  const [priceInput, setPriceInput] = useState();

  // const principalId = Principal.fromText(id);
  const localHost = "http://localhost:8080/";
  const HTTPagent = new HttpAgent({ host: localHost });

  HTTPagent.fetchRootKey(); // This is a workaround just for local environment. for PROD DELETE this command.
  let NFTActor;

  async function loadNFT() {
    NFTActor = await Actor.createActor(idlFactory, {
      agent: HTTPagent,
      canisterId: id,
    });

    const NFTName = await NFTActor.getName();
    const NFTOwner = await NFTActor.getOwner();
    const imageData = await NFTActor.getAsset();
    const imgContent = new Uint8Array(imageData);
    const image = URL.createObjectURL(new Blob([imgContent.buffer], { type: "image/png" }));

    setName(NFTName);
    setOwner(NFTOwner.toText());
    setImg(image);

    setButton(<Button handleClick={handleSell} text={"Sell"} />);
  }

  let price;
  const handleSell = () => {
    setPriceInput(
      <input placeholder="Price in DANG" type="number" className="price-input" value={price} onChange={(e) => (price = e.target.value)} />
    );
    setButton(<Button handleClick={sellItem} text={"Confirm"} />);
  };

  const sellItem = async () => {
    const listingResult = await opend.listItem(id, Number(price));
    console.log("listingResult", listingResult);
    if (listingResult === "Success") {
      const openDId = await opend.getOpendCanisterID();
      const transferResult = await NFTActor.transferOwnership(openDId);
      console.log("transferResult", transferResult);
    }
  };

  useEffect(() => {
    loadNFT();
  }, []);

  return (
    <div className="disGrid-item">
      <div className="disPaper-root disCard-root makeStyles-root-17 disPaper-elevation1 disPaper-rounded">
        <img className="disCardMedia-root makeStyles-image-19 disCardMedia-media disCardMedia-img" src={img} />
        <div className="disCardContent-root">
          <h2 className="disTypography-root makeStyles-bodyText-24 disTypography-h5 disTypography-gutterBottom">
            {name}
            <span className="purple-text"></span>
          </h2>
          <p className="disTypography-root makeStyles-bodyText-24 disTypography-body2 disTypography-colorTextSecondary">Owner: {owner}</p>
          {priceInput}
          {button}
        </div>
      </div>
    </div>
  );
}

export default Item;
