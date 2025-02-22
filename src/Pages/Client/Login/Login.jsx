import React, { useContext, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import G_F from "./Other/G_F";
import { ContextUsers } from "../../../Context/Client/UserConetxt";
import { ContextLogin } from "../../../Context/LoginContext";
import { useNotification } from "../../../Context/Client/NotificationProvider";
import bcrypt from "bcryptjs";
import { signInWithPopup } from "firebase/auth";
import { googleProvider, auth } from "../../../Services/Config_Firebase";
import { ROLES } from "../../../Utils/Contants";
import { addDocument } from "../../../Services/Service_Firebase";

function Login({
  open_Login,
  setOpen_Login,
  setOpen_Register,
  setOpen_Forgot_Password,
}) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState("");
  const showNotification = useNotification();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const UserList = useContext(ContextUsers);
  const { saveLoCal } = useContext(ContextLogin);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const handleClose = () => {
    setOpen_Login(false);
  };
  const handleOpen_Forgot_Password = () => {
    setOpen_Forgot_Password(true);
  };

  const handleOpen_Register = () => {
    setOpen_Register(true);
  };
  // Sử lý dữ liệu
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const Validation = () => {
    const newErrors = {};

    // Kiểm tra xem email và password có được nhập hay không
    newErrors.email = user.email ? "" : "Please Enter Email";
    newErrors.password = user.password ? "" : "Please Enter Password";

    // Tìm người dùng khớp trong UserList
    const userExample = UserList.find(
      (e) =>
        e.email === user.email && bcrypt.compareSync(user.password, e.password)
    );

    if (user.email && user.password) {
      if (userExample) {
        // Đã tìm thấy người dùng khớp
        saveLoCal(userExample);
      } else {
        // Không tìm thấy người dùng khớp
        newErrors.email = "Invalid email, please re-enter";
        newErrors.password = "Wrong password, please re-enter";
      }
      return;
    }

    // Cập nhật lỗi vào state
    setErrors(newErrors);

    // Trả về true nếu không có lỗi
    return Object.values(newErrors).some((e) => e !== "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!Validation()) {
      showNotification("Login successful", "success");
      handleClose();
      setUser("");
      setErrors("");
    } else {
      console.log("Có lỗi:", Validation());
      showNotification("Login failed, please login again", "error");
    }
  };
  // Google sign-in
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const existingCustomer = UserList.find(
        (customer) => customer.email === user.email
      );
      let loggedInCustomer;

      if (!existingCustomer) {
        const newCustomer = {
          username: user.displayName,
          imgUrl: user.photoURL,
          role: ROLES.USER,
          email: user.email,
        };
        await addDocument("accounts", newCustomer);
        loggedInCustomer = newCustomer;
      } else {
        loggedInCustomer = existingCustomer;
      }
      saveLoCal(loggedInCustomer);
      showNotification("Login successful", "success");
      handleClose();
    } catch (error) {
      showNotification("Login failed, please login again", "error");
    }
  };
  return (
    <>
      <Dialog
        open={open_Login}
        fullWidth
        onClose={handleClose}
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
          {"LOGIN"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <TextField
              fullWidth
              id="standard-basic"
              label="Gmail"
              type="email"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  document
                    .getElementById("standard-adornment-password")
                    .focus();
                }
              }}
              onChange={handleChange}
              value={user.email}
              name="email"
              variant="standard"
              error={!!errors.email}
              helperText={errors.email}
              sx={{ paddingTop: "10px", paddingBottom: "10px" }}
            />
            <FormControl
              variant="standard"
              fullWidth
              sx={{ paddingTop: "10px", paddingBottom: "10px" }}
            >
              <InputLabel htmlFor="standard-adornment-password">
                Password
              </InputLabel>
              <Input
                id="standard-adornment-password"
                onChange={handleChange}
                value={user.password}
                name="password"
                error={!!errors.password}
                onKeyDown={(e) => {
                  if (errors.email && errors.password) {
                    if (e.key === "Enter") {
                      document.getElementById("Login").focus();
                    }
                  } else if (e.key === "Enter") {
                    document.getElementById("standard-basic").focus();
                  }
                }}
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword
                          ? "hide the password"
                          : "display the password"
                      }
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {errors.password && (
                <p style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
                  {errors.password}
                </p>
              )}
            </FormControl>
          </DialogContentText>
          <DialogContentText>
            <div className=" flex justify-center my-5">
              <p
                className=" mr-3 text-sm hover:text-gray-500 text-slate-400 my-auto inline"
                style={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  handleOpen_Forgot_Password();
                  handleClose();
                }}
              >
                Forgot password ?
              </p>

              <button
                id="Login"
                class="relative inline-flex items-center justify-center px-8 py-2.5 overflow-hidden tracking-tighter text-white bg-gray-500 rounded-md group"
                onClick={handleSubmit}
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
                <span class="relative text-base font-semibold">Login</span>
              </button>
            </div>
            <DialogContentText>
              <div className="flex justify-center my-auto">
                <p
                  style={{
                    cursor: "default",
                  }}
                >
                  Don't have an account?
                </p>
                <p
                  className=" ml-2 text-blue-700 hover:text-yellow-900"
                  onClick={() => {
                    handleOpen_Register();
                    handleClose();
                  }}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  Sign in
                </p>
              </div>
            </DialogContentText>
            <div className="flex my-5">
              <div className="w-56 h-[1px] bg-gray-300 z-10 m-auto"></div>
              <button className="border-none" variant="outlined" disabled>
                <p className="text-gray-600 text-lg">Or</p>
              </button>
              <div className="w-56 h-[1px] bg-gray-300 z-10 m-auto "></div>
            </div>
            <G_F signInWithGoogle={signInWithGoogle} />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Login;
