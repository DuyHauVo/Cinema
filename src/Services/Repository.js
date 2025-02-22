// trả về một đối tượng có id trùng với list {{name1:...,age1:...,},{name2:...,age2:...,},{name3:...,age3:...,}}=> {name1:...,age1:...,}
export const getObjectById = (id, list) => {
  return list?.find((a) => a.id === id);
};
// trả về một mảng đối tượng có id trùng với list {id:...,name:...,age:...,...}
export const getObjectById_List = (id, list) => {
  return list?.filter((a) => a.id === id);
};
// trả về một đối tượng có id trùng với list có name để so sánh {name:...,age:...,user:...,number:[0,1,2,3,4,5]}=>name là number => trả vè mảng number:[0,1,2,3,4,5]
export const listObjectById_Movie = (id, list, name) => {
  return list?.find((a) => a[name] === id);
};
// trả về một mảng đối tượng có id trùng với list và có kèm theo tên id để so sánh {id:...,name: id ,age:...,...}
export const listObjectById = (id, list, name) => {
  return list?.filter((a) => a[name] === id);
};
// trả về mảng đối tượng trong 3 ngày
export const getShowtimes = (data) => {
  const today = new Date();
  const twoDaysLater = new Date();
  twoDaysLater.setDate(today.getDate() + 2);

  return data.filter((showtime) => {
    const showtimeDate = new Date(showtime.date);
    return showtimeDate >= today && showtimeDate <= twoDaysLater;
  });
};
// trả về mảng đối tượng từ 3 ngày trở lên
export const getShowWilltimes = (data) => {
  const today = new Date();
  const twoDaysLater = new Date();
  twoDaysLater.setDate(today.getDate() + 2);

  return data.filter((showtime) => {
    const showtimeDate = new Date(showtime.date);
    return showtimeDate > twoDaysLater;
  });
};
