export const menu = [
  {
    id: 1,
    icon: `fa-solid fa-film`,
    title: "Movie",
    items: [
      {
        id: 1,
        icon: `fa-solid fa-circle dog`,
        title: "Movie",
        path: "/movies",
      },
      {
        id: 2,
        icon: `fa-solid fa-circle dog`,
        title: "Movie_Screening",
        path: "/movie_screening",
      },
      {
        id: 3,
        icon: `fa-solid fa-circle dog`,
        title: "Performer",
        path: "/performer",
      },
    ],
  },
  {
    id: 2,
    icon: `fa-solid fa-ticket`,
    title: "Services",
    items: [
      {
        id: 1,
        icon: `fa-solid fa-circle dog`,
        title: "Booking",
        path: "/booking",
      },
      {
        id: 2,
        icon: `fa-solid fa-circle dog`,
        title: "Service_Food",
        path: "/service_Food",
      },
    ],
  },
  {
    id: 3,
    icon: `fa-solid fa-couch`,
    title: "Chair",
    items: [
      {
        id: 1,
        icon: `fa-solid fa-circle dog`,
        title: "Chairs",
        path: "/chair",
      },
      {
        id: 2,
        icon: `fa-solid fa-circle dog`,
        title: "Type_Chair",
        path: "/type_chair",
      },
    ],
  },
  {
    id: 4,
    icon: `fa-solid fa-tents`,
    title: "Room",
    items: [
      {
        id: 1,
        icon: `fa-solid fa-circle dog`,
        title: "Region",
        path: "/region",
      },
      {
        id: 2,
        icon: `fa-solid fa-circle dog`,
        title: "Location",
        path: "/location",
      },{
        id: 3,
        icon: `fa-solid fa-circle dog`,
        title: "Room",
        path: "/room",
      },
    ],
  },
  {
    id: 5,
    icon: `fa-solid fa-user`,
    title: "User",
    items: [
      {
        id: 1,
        icon: `fa-solid fa-circle dog`,
        title: "Users",
        path: "/users",
      },
      {
        id: 2,
        icon: `fa-solid fa-circle dog`,
        title: "Lever_Member",
        path: "/lever_member",
      },
    ],
  },
];
export const menu_home = [
  {
    id: 1,
    title: "Trang chủ",
    path: "/",
  },
  {
    id: 2,
    title: "Phim",
    path: "/phim",
    child: [
      {
        id: 1,
        title: "Phim đang chiếu",
      },
      {
        id: 2,
        title: "Phim sắp chiếu",
      },
    ],
  },
  {
    id: 3,
    title: "Lịch chiếu",
    path: "/lichchieu",
  },
  {
    id: 4,
    title: "Ưu đãi",
    path: "/uudai",
  },
  {
    id: 5,
    title: "Hỗ trợ khách hàng",
    path: "/hotrokhachang",
  },
  {
    id: 6,
    title: "Liên hệ",
    path: "/lienhe",
  },
  {
    id: 7,
    title: "Thành viên",
    path: "/thanhvien",
  },
  {
    id: 8,
    icon: "fa-solid fa-user",
    childs: [
      {
        id: 1,
        title: "Đăng nhập",
      },
      {
        id: 2,
        title: "Đăng kí",
      },
    ],
  },
];
