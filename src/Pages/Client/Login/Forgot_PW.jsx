import React, { useContext, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import emailjs from "emailjs-com";
import { ContextUsers } from "../../../Context/Client/UserConetxt";
import { useNotification } from "../../../Context/Client/NotificationProvider";
import {
  YOUR_SERVICE_ID,
  YOUR_TEMPLATE_ID,
  YOUR_USER_KEY_ID,
} from "../../../Utils/Contants";
import Update_PW from "./New_PW/Update_PW";

function Forgot_PW({
  open_Forgot_Password,
  setOpen_Forgot_Password,
  setOpen_Login,
}) {
  const handleClose_Forgot_Password = () => {
    setOpen_Forgot_Password(false);
  };
  const handleOpen_Login = () => {
    setOpen_Login(true);
  };

  // Biến
  const [open, setOpen] = useState(false);
  const [open_update, setOpen_Update] = useState(false);
  const [new_Code_Email, setNew_Code_Email] = useState("");
  const [value_email, setValue_Email] = useState("");
  const [enter_number_Code, setEnter_Number_Code] = useState("");

  const userData = useContext(ContextUsers);
  const showNotification = useNotification();

  const handleClose = () => setOpen(false);

  // #region Sử lý dữ liệu

  // Tạo mã xác nhận ngẫu nhiên gồm 4 chữ số
  const generateConfirmCode = () => {
    return Math.floor(1000 + Math.random() * 9000).toString(); // Mã xác nhận 4 số
  };
  //Function gửi mã code đến email
  const handleValueEmail = async () => {
    // kiểm tra xem có email trong db ko
    const userItem = userData.find((e) => e.email === value_email);
    if (!userItem) {
      showNotification("Email does not exist", "error");
      return;
    }
    // tạo một mã code gồm 4 chữ số => set và useSate đã tạo
    const code = generateConfirmCode();
    setNew_Code_Email(code);

    //tạo một đối tượng để gửi lên emailjs
    const templaceContent = {
      to_name: userItem.username,
      confirm_code: code,
      to_mail: value_email,
    };
    // sử dụng emailsj.send để gửi dữ liệu lên email js
    try {
      await emailjs.send(
        YOUR_SERVICE_ID,
        YOUR_TEMPLATE_ID,
        templaceContent,
        YOUR_USER_KEY_ID
      );
      // thông báo khi đã gửi mã code đến mail thành công => modal nhập mã code
      showNotification("Sent to email", "success");
      setOpen(true);
      setOpen_Forgot_Password(false);
    } catch (error) {
      console.log(error);
    }
  };

  // kiểm tra mã code người dùng nhập vào
  const handleCheckNumberCode = () => {
    if (enter_number_Code === new_Code_Email) {
      showNotification("Code match", "success");
      setOpen_Update(true);
      setOpen(false);
    } else {
      showNotification("Invalid Code", "error");
    }
  };

  return (
    <div>
      <Dialog
        open={open_Forgot_Password}
        fullWidth
        onClose={handleClose_Forgot_Password}
        sx={{
          "& .MuiPaper-root": {
            backgroundImage:
              "linear-gradient(to top, #d9afd9 0%, #97d9e1 100%)",
          },
        }}
      >
        <DialogTitle
          className="text-center"
          style={{ fontWeight: "600", fontSize: "25px", cursor: "pointer" }}
        >
          {"FORGOT PASSWORD"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <TextField
              fullWidth
              id="standard-basic"
              label="  Gmail"
              type="email"
              variant="standard"
              sx={{ paddingTop: "10px", paddingBottom: "10px" }}
              onChange={(e) => setValue_Email(e.target.value)}
            />
          </DialogContentText>
          <DialogContentText>
            <div className=" flex justify-center my-5">
              <button
                onClick={handleValueEmail}
                class="relative inline-flex items-center justify-center px-8 py-2.5 overflow-hidden tracking-tighter text-white bg-gray-500 rounded-md group"
              >
                <span class="absolute w-0 h-0 transition-all duration-500 ease-out bg-orange-600 rounded-full group-hover:w-56 group-hover:h-56"></span>
                <span class="absolute bottom-0 left-0 h-full -ml-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-auto h-full opacity-100 object-stretch"
                    viewBox="0 0 487 487"
                  >
                    <path
                      fill-opacity=".1"
                      fill-rule="nonzero"
                      fill="#FFF"
                      d="M0 .3c67 2.1 134.1 4.3 186.3 37 52.2 32.7 89.6 95.8 112.8 150.6 23.2 54.8 32.3 101.4 61.2 149.9 28.9 48.4 77.7 98.8 126.4 149.2H0V.3z"
                    ></path>
                  </svg>
                </span>
                <span class="absolute top-0 right-0 w-12 h-full -mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="object-cover w-full h-full"
                    viewBox="0 0 487 487"
                  >
                    <path
                      fill-opacity=".1"
                      fill-rule="nonzero"
                      fill="#FFF"
                      d="M487 486.7c-66.1-3.6-132.3-7.3-186.3-37s-95.9-85.3-126.2-137.2c-30.4-51.8-49.3-99.9-76.5-151.4C70.9 109.6 35.6 54.8.3 0H487v486.7z"
                    ></path>
                  </svg>
                </span>
                <span class="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-200"></span>
                <span class="relative text-base font-semibold">Send</span>
              </button>
            </div>
            <DialogContentText>
              <div className="flex justify-center my-auto">
                <p
                  style={{
                    cursor: "default",
                  }}
                >
                  Return to login state!
                </p>
                <p
                  className=" ml-2 text-blue-700 hover:text-yellow-900"
                  onClick={() => {
                    handleOpen_Login();
                    handleClose_Forgot_Password();
                  }}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  Login
                </p>
              </div>
            </DialogContentText>
          </DialogContentText>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
      <div>
        <Dialog
          sx={{
            "& .MuiPaper-root": {
              backgroundImage:
                "linear-gradient(to top, #d9afd9 0%, #97d9e1 100%)",
              maxWidth: "none",
              width: "100%", // Chiều rộng mặc định
              "@media (min-width: 640px) and (max-width:767px)": {
                // sm: Từ 640px trở lên
                width: "100px",
              },
              "@media (min-width: 768px) and (max-width:1023px)": {
                // md: Từ 768px trở lên
                width: "200px",
              },

              "@media (min-width: 1024px)": {
                // lg: Từ 1024px trở lên
                width: "350px",
              },
            },
          }}
          open={open}
        >
          <DialogTitle>Enter a Number</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="number"
              label="Number"
              type="number"
              onChange={(e) => setEnter_Number_Code(e.target.value)}
              fullWidth
              sx={{
                "& input[type=number]::-webkit-inner-spin-button, & input[type=number]::-webkit-outer-spin-button":
                  {
                    WebkitAppearance: "none", // Ẩn spinner trên trình duyệt Webkit
                    margin: 0, // Loại bỏ khoảng cách thừa
                  },
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCheckNumberCode}>Submit</Button>
          </DialogActions>
        </Dialog>
      </div>
      <Update_PW
        open_update={open_update}
        setOpen_Update={setOpen_Update}
        value_email={value_email}
        setOpen_Login={setOpen_Login}
      />
    </div>
  );
}

export default Forgot_PW;
