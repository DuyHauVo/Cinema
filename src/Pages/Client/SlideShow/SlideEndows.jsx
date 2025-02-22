import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules"; // Import đúng namespace

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { ContextEndow } from "../../../Context/ContextHelp/EndowContext";
import { ContextNews } from "../../../Context/ContextHelp/NewContext";

function SlideEndows(props) {
  const listNews = useContext(ContextNews);

  return (
    <div
      className="p-10"
      style={{
        width: "100%",
        backgroundImage: "linear-gradient(-225deg, #E3FDF5 0%, #FFE6FA 100%)",
      }}
    >
      <h1 className="text-center text-4xl text-black mb-4 font-semibold">
        <p
          style={{
            boxShadow: "linear-gradient(to right, #ec77ab 0%, #7873f5 100%)",
          }}
        >
          NEWS
        </p>
      </h1>

      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        modules={[Navigation, Pagination, Autoplay]}
        breakpoints={{
          // Khi màn hình có độ rộng >= 1024px (Laptop)
          1024: {
            slidesPerView: 3, // 3 slides cho laptop
          },
          // Khi màn hình có độ rộng >= 768px (Tablet)
          768: {
            slidesPerView: 2, // 2 slides cho tablet
          },
          // Khi màn hình có độ rộng < 768px (Mobile)
          0: {
            slidesPerView: 1, // 1 slide cho mobile
          },
        }}
      >
        {listNews.map((slide) => (
          <SwiperSlide key={slide.id}>
            <img
              src={slide.imgUrl}
              alt=""
              style={{ width: "100%", height: "240px" }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default SlideEndows;
