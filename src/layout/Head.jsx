import React from "react";

function Head(props) {
  return (
    <div className="header">
      <div className="header-top">
        <div className="header-left">
          <div className="call_number">
            <i class="fa-solid fa-phone"></i>
            call:<p>0846 27 22 88</p>
          </div>
          <div className="email ms-5">
            <i class="fa-solid fa-envelope"></i>
            email: <p>cskh@riocenter.vn</p>
          </div>
        </div>
        <div className="header-right">
          <i class="fa-brands fa-facebook"></i>
          <i class="fa-brands fa-youtube"></i>
          <i class="fa-brands fa-tiktok"></i>
          <i class="fa-brands fa-instagram"></i>
          <img
            src="http://www.riocinemas.vn/Content/img/icons/app-1.png"
            alt=""
          />
          <img
            src="http://www.riocinemas.vn/Content/img/icons/app-2.png"
            alt=""
          />
        </div>
      </div>
      <div className="header-lower"></div>
    </div>
  );
}

export default Head;
