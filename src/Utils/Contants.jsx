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
      },
      {
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
  {
    id: 6,
    icon: `fa-solid fa-circle-info`,
    title: "Help",
    items: [
      {
        id: 1,
        icon: `fa-solid fa-circle dog`,
        title: "Endow",
        path: "/endows",
      },
      {
        id: 2,
        icon: `fa-solid fa-circle dog`,
        title: "News",
        path: "/news",
      },
    ],
  },
];
export const menu_home = [
  {
    id: 1,
    title: "Home",
    path: "/",
  },
  {
    id: 2,
    title: "Movies",
    path: "/phim",
    child: [
      {
        id: 1,
        title: "Movies Showing",
      },
      {
        id: 2,
        title: "Upcoming Movies",
      },
    ],
  },
  {
    id: 3,
    title: "Showtimes",
    path: "/lichchieu",
  },
  {
    id: 4,
    title: "Endows",
    path: "/uudai",
  },
  {
    id: 5,
    title: "Support",
    path: "/hotrokhachang",
  },
  {
    id: 6,
    title: "Contact",
    path: "/lienhe",
  },
  {
    id: 7,
    title: "Members",
    path: "/thanhvien",
  },
  
];

// Constants for roles
export const ROLES = {
  ADMIN: "admin", // Quản trị viên cấp cao
  MODERATOR: "moderator", // Quản trị viên cấp trung (người kiểm duyệt)
  USER: "user", // Người dùng thông thường
};
//
export const YOUR_SERVICE_ID = "service_4hfmh4e";
export const YOUR_TEMPLATE_ID = "template_p7jz40g";
export const YOUR_USER_KEY_ID = "JZwsvhkiya7AksaE1";

export const initialOptions = {
  "client-id": "AevNTDzPZ-ze3TIFsghO3qhCu2iA34IdS3Ol04QbGofNAAwJrXCg5yKD4S7Gs1rrLhst4JecOnOl9LKo",
  currency: "USD",
  intent: "capture"
};