import React from "react";

function G_F({ signInWithGoogle }) {
  return (
    <div className="grid grid-cols-2 gap-2 my-5">
      <button
        onClick={signInWithGoogle}
        className="relative inline-flex items-center justify-center px-8 py-2.5 overflow-hidden tracking-tighter text-white rounded-md group"
        style={{
          backgroundImage: "linear-gradient(to top, #accbee 0%, #e7f0fd 100%)",
        }}
      >
        {/* Vòng hover */}
        <span
          className="absolute w-0 h-0 transition-all duration-500 ease-out rounded group-hover:w-full group-hover:h-56"
          style={{
            backgroundImage:
              "linear-gradient(-20deg, #e9defa 0%, #fbfcdb 100%)",
          }}
        ></span>

        {/* Hiệu ứng SVG trái */}
        <span className="absolute bottom-0 left-0 h-full -ml-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-auto h-full opacity-10 object-stretch"
            viewBox="0 0 487 487"
          >
            <path
              fillOpacity=".1"
              fillRule="nonzero"
              fill="#FFF"
              d="M0 .3c67 2.1 134.1 4.3 186.3 37 52.2 32.7 89.6 95.8 112.8 150.6 23.2 54.8 32.3 101.4 61.2 149.9 28.9 48.4 77.7 98.8 126.4 149.2H0V.3z"
            ></path>
          </svg>
        </span>

        {/* Hiệu ứng SVG phải */}
        <span className="absolute top-0 right-0 w-12 h-full -mr-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="object-cover w-full h-full"
            viewBox="0 0 487 487"
          >
            <path
              fillOpacity=".1"
              fillRule="nonzero"
              fill="#FFF"
              d="M487 486.7c-66.1-3.6-132.3-7.3-186.3-37s-95.9-85.3-126.2-137.2c-30.4-51.8-49.3-99.9-76.5-151.4C70.9 109.6 35.6 54.8.3 0H487v486.7z"
            ></path>
          </svg>
        </span>

        {/* Gradient nền nút thay đổi */}
        <span
          className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 transition-all duration-500 ease-in-out group-hover:opacity-100"
          style={{
            backgroundImage:
              "linear-gradient(-20deg, #e9defa 0%, #fbfcdb 100%)",
          }}
        ></span>

        {/* Nội dung nút */}
        <span className="relative flex items-center text-base font-semibold z-10 text-gray-700">
          {/* Icon Google */}
          <i className="fab fa-google mr-2 text-xl"></i>
          GOOGLE
        </span>
      </button>

      <button
        className="relative inline-flex items-center justify-center px-8 py-2.5 overflow-hidden tracking-tighter text-white rounded-md group"
        style={{
          backgroundImage: "linear-gradient(to top, #4481eb 0%, #04befe 100%)",
        }}
      >
        {/* Vòng hover */}
        <span
          className="absolute w-0 h-0 transition-all duration-500 ease-out rounded group-hover:w-full group-hover:h-56"
          style={{
            backgroundImage:
              "linear-gradient(-225deg, #5D9FFF 0%, #B8DCFF 48%, #6BBBFF 100%)",
          }}
        ></span>

        {/* Hiệu ứng SVG trái */}
        <span className="absolute bottom-0 left-0 h-full -ml-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-auto h-full opacity-10 object-stretch"
            viewBox="0 0 487 487"
          >
            <path
              fillOpacity=".1"
              fillRule="nonzero"
              fill="#FFF"
              d="M0 .3c67 2.1 134.1 4.3 186.3 37 52.2 32.7 89.6 95.8 112.8 150.6 23.2 54.8 32.3 101.4 61.2 149.9 28.9 48.4 77.7 98.8 126.4 149.2H0V.3z"
            ></path>
          </svg>
        </span>

        {/* Hiệu ứng SVG phải */}
        <span className="absolute top-0 right-0 w-12 h-full -mr-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="object-cover w-full h-full"
            viewBox="0 0 487 487"
          >
            <path
              fillOpacity=".1"
              fillRule="nonzero"
              fill="#FFF"
              d="M487 486.7c-66.1-3.6-132.3-7.3-186.3-37s-95.9-85.3-126.2-137.2c-30.4-51.8-49.3-99.9-76.5-151.4C70.9 109.6 35.6 54.8.3 0H487v486.7z"
            ></path>
          </svg>
        </span>

        {/* Gradient nền nút thay đổi */}
        <span
          className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 transition-all duration-500 ease-in-out group-hover:opacity-100"
          style={{
            backgroundImage:
              "linear-gradient(-225deg, #5D9FFF 0%, #B8DCFF 48%, #6BBBFF 100%)",
          }}
        ></span>

        {/* Nội dung nút */}
        <span className="relative flex items-center text-blue-50 text-base font-semibold z-10 text-gray-700">
          {/* Icon Google */}
          <i className="fa-brands fa-facebook-f mr-2 text-xl"></i>
          FACEBOOK
        </span>
      </button>
    </div>
  );
}

export default G_F;
