import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import { HttpAgent, Actor } from "@dfinity/agent";
import { idlFactory } from "../../../declarations/nft";
import { Principal } from "@dfinity/principal";

function Item({ id }) {
  const [name, setName] = useState("");
  const [owner, setOwner] = useState("");
  const [img, setImg] = useState("");

  const principalId = Principal.fromText(id);
  const localHost = "http://localhost:8080/";
  const httpAgent = new HttpAgent({ host: localHost });

  async function loadNFT() {
    const NFTActor = await Actor.createActor(idlFactory, {
      agent: httpAgent,
      canisterId: principalId,
    });

    const NFTName = await NFTActor.getName();
    const NFTOwner = await NFTActor.getOwner();
    const imageData = await NFTActor.getAsset();
    const imgContent = new Uint8Array(imageData);
    const image = URL.createObjectURL(new Blob([imgContent.buffer], { type: "image/png" }));
    setName(NFTName);
    setOwner(NFTOwner.toText());
    setImg(image);
  }

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
        </div>
      </div>
    </div>
  );
}

export default Item;
