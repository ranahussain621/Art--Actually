import React, { useState } from 'react';
import cardImage1 from '../../assets/images/cardImage3.png';

export const MusicStyleCard = () => {
  const [disabledCards, setDisabledCards] = useState([]);

  const handleCardClick = (index) => {
    if (!disabledCards.includes(index)) {
      setDisabledCards([...disabledCards, index]);
    }
  };

  const cards = Array.from({ length: 10 }).map((_, index) => (
    <div
      key={index}
      className="col-md mt-1 p-0 d-flex justify-content-center"
      style={{ paddingLeft: '20px', paddingRight: '20px' }}
    >
      <div
        className="card  text-white"
        style={{
          width: '150px',
          backgroundColor: disabledCards.includes(index) ? 'transparent' : '#709BA5',
          transition: 'background-color 0.3s',
          pointer:"cursor",
        
          zIndex:"1"
        }}
        onClick={() => handleCardClick(index)}
      >
        <img src={cardImage1} className="card-img w-100" alt="..." />
        <div className="card-img-overlay" style={{ backgroundColor: disabledCards.includes(index) ? 'rgba(0,0,0,0.5)' : '#709BA5',}}>
          {/* <h5 className="card-title">Card title</h5> */}
          <p className="card-text" style={{color:"white", fontSize:"14px", textAlign:"left", fontWeight:"400" , position:"absolute", bottom:"2px", width:"90px"}}>This is a wider card with</p>
        </div>
      </div>
    </div>
  ));

  return (
    <>
      <div className="row">{cards}</div>
    </>
  );
};