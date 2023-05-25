import React from 'react';
import img1 from "./images/image1.jpg";
import img2 from "./images/image2.jpg";
import img3 from "./images/image3.jpg";
import "./card.css";

import 'bootstrap/dist/css/bootstrap.min.css';

function Cards() {
  return (
    <section id='CARD'>
    <div className='cards'>
      <h1 className="text-center text-light ">Welcome to our services</h1>
      <div className="container text-center">
      <div className="row">
        <div className="col">
          <div className="card">
  <img src={img1} className="card-img-top" height="250" alt="" />
  <div className="card-body" >
    <h5 className="card-title">Weather Forecast</h5>
    <p className="card-text">Keep track of the latest weather conditions and forecasts to plan your farming operations effectively.</p>
    <a href="/weather" className="btn btn-primary" style={{backgroundColor:"#0F6292"}}>Click here</a>
  </div>
</div>
        </div>
        <div className="col">
          <div className="card">
  <img src={img2} className="card-img-top" height="250" alt=""/>
  <div className="card-body" >
    <h5 className="card-title">Stores</h5>
    <p className="card-text">Access a comprehensive selection of locally-sourced produce and supplies at our farmer's store.</p>
    <a href="/storeSection" className="btn btn-primary" style={{backgroundColor:"#0F6292"}}>Click here</a>
  </div>
</div>
        </div>
        <div className="col">
          <div className="card">
  <img src={img3} className="card-img-top" height="250" alt=""/>
  <div className="card-body" >
    <h5 className="card-title">Major Crops</h5>
    <p className="card-text">Gain valuable insights into major crop cultivation techniques and market trends to optimize your yields.</p>
    <a href="/localcrops" className="btn btn-primary" style={{backgroundColor:"#0F6292"}}>Click here</a>
  </div>
</div>
        </div>
      </div>
    </div>
    </div>
    </section>
  );
}

export default Cards;
