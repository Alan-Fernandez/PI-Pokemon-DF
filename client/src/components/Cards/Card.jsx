import React from "react";
import { Link } from "react-router-dom";
import "./card.css";

const Card = ({ array, img, key }) => {

  return (
    <div className="container">
      {Array.isArray(array) && array.length ? (
        array.map((p) => (
          <Link to={`/pokedex/${p.id}`} key={p.id}>
            <figure className={`card ${p.type[0]} filter:blur(5px)`}>
              <div className="cardImageContainer">
                <img 
                  src={p.img} alt="" 
                  className="CardImage" 
                />
              </div>
              <figcaption 
                className="cardCaption"
              >
                <h1 
                  className="cardName"
                >
                  ({p.idPoke 
                    ?`${p.idPoke}H` 
                    :p.id}){p.name}
                </h1>
                {p.type.length === 2 ? (
                  <div 
                    className="types"
                  >
                    <h3 className="cardType">
                      {p.type[0]}
                    </h3>
                    <h3 className="cardType">
                      {p.type[1]}
                    </h3>
                  </div>
                ) : (
                  <div className="types">
                    <h3 className="cardType">
                      {p.type[0]}
                    </h3>
                  </div>
                )}
              </figcaption>
            </figure>
          </Link>
        ))
      ) : (
        <img
          src={
            array && array.info
              ? "https://media.giphy.com/media/UHAYP0FxJOmFBuOiC2/giphy.gif"
              : img
          }
          alt="Not found"
        />
      )}
    </div>
  );
};

export default Card;
