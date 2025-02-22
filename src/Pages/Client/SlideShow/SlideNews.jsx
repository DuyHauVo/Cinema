import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules"; // Import đúng namespace

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { ContextEndow } from "../../../Context/ContextHelp/EndowContext";

function SlideNews(props) {
  const listEndows = useContext(ContextEndow);

  return (
    <div
      className="p-10 mt-9"
      style={{
        width: "100%",
        backgroundImage:
          "linear-gradient(-225deg, #231557 0%, #44107A 29%, #FF1361 67%, #FFF800 100%)",
      }}
    >
      <h1 className="text-center text-4xl text-white mb-4 font-semibold">
        <p
          style={{
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
          }}
        >
          ENDOWS
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
        {listEndows.map((slide) => (
          <SwiperSlide key={slide.id}>
            <img
              src={slide.imgUrl}
              alt=""
              style={{ width: "100%", height: "330px" }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default SlideNews;
