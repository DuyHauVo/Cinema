import React from "react";
import logo from "../Assets/logo/hau-removebg-preview.png";

function Footer_home(props) {
  return (
    <div className="bg-black">
      <div className="p-2">
        <div className="w-28 mx-auto">
          <img className="bg-black p-2" src={logo} alt="" />
        </div>
        <div className="grid lg:grid-cols-4 gap-3 grid-cols-1 px-36 py-14 text-white">
          <div className="hover:cursor-pointer">
            <ul>
              <li className="mb-3">
                <strong className="text-xl ml-[26px]">H CINEMAS</strong>
              </li>
              <li>{" >> "} ĐIỀU KHOẢN BẢO MẬT</li>
              <li>{" >> "} ĐIỀU KHOẢN CHUNG</li>
              <li>{" >> "} ĐIỀU KHOẢN GIAO DỊCH</li>
              <li>{" >> "} CHÍNH SÁCH THANH TOÁN</li>
              <li>
                {" >> "} CHÍNH SÁCH ĐỔI TRẢ VÉ VÀ <br /> HOÀN TIỀN
              </li>
            </ul>
          </div>
          <div className="hover:cursor-pointer">
            <ul>
              <li className="mb-3">
                <strong className="text-xl ml-[26px]">GIỚI THIỆU</strong>
              </li>
              <li>{" >> "} VỀ CHÚNG TÔI</li>
              <li>{" >> "} TUYỂN DỤNG</li>
            </ul>
          </div>
          <div className="hover:cursor-pointer">
            <ul>
              <li className="mb-3">
                <strong className="text-xl ml-[26px]">HỖ TRỢ</strong>
              </li>
              <li>{" >> "} LIÊN HỆ - GÓP Ý</li>
              <li>{" >> "} HỐ TRỢ KHÁCH HÀNG</li>
              <li>{" >> "} ĐIỀU KHOẢN GIAO DỊCH</li>
              <li>{" >> "} HỢP TÁC QUẢNG CÁO</li>
              <li>
                <img
                  className="pr-5 pt-5"
                  src="http://www.riocinemas.vn/Content/img/bocongthuong.png"
                  alt=""
                />
              </li>
            </ul>
          </div>
          <div className="hover:cursor-pointer">
            <ul>
              <li className="">
                <strong className="text-xl ml-[26px]">KẾT NỐI VỚI</strong>
              </li>
              <li className="">
                <strong className="text-xl ml-[26px]">RIOCINEMAS</strong>
              </li>
            </ul>
            <div className="flex justify-evenly text-white text-4xl p-6">
              <i class="fa-brands fa-facebook"></i>
              <i class="fa-brands fa-youtube"></i>
              <i class="fa-brands fa-tiktok"></i>
              <i class="fa-brands fa-instagram"></i>
            </div>
            <strong className="text-xl ml-[26px]">DOWNLOAD APP</strong>

            <div className="w-[150px] h-auto p-3 mt-4">
              <img
                src="http://www.riocinemas.vn/Content/img/icons/app-1.png"
                alt=""
              />
            </div>
            <div className="w-[150px] h-auto p-3">
              <img
                src="http://www.riocinemas.vn/Content/img/icons/app-2.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer_home;
