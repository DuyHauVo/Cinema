import React, { useContext, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { ROLES } from "../../../Utils/Contants";
import { addDocument } from "../../../Services/Service_Firebase";
import G_F from "./Other/G_F";
import { ContextUsers } from "../../../Context/Client/UserConetxt";
import { useNotification } from "../../../Context/Client/NotificationProvider";
import { ContextLogin } from "../../../Context/LoginContext";
import bcrypt from "bcryptjs";
import  iconavata  from "../../../Assets/avata/icon.png";

const inter = {
  imgUrl: iconavata,
  role: ROLES.USER,
  username: "",
  email: "",
  phone: "",
};
function Register({ open_Register, setOpen_Register, setOpen_Login }) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showCheckPass, setShowCheckPass] = React.useState(false);
  const [user, setUser] = useState(inter);
  const [checkpass, setCheckPass] = useState("");
  const [errors, setErrors] = useState("");
  const showNotification = useNotification();

  const userData = useContext(ContextUsers);
  const { saveLoCal } = useContext(ContextLogin);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowCheckPass = () => setShowCheckPass((show) => !show);

  const handleClose = () => {
    setOpen_Register(false);
  };
  const handleOpen_Login = () => {
    setOpen_Login(true);
  };
  //#region Sử lý dữ liệu
  const userItem = userData.map((doc) => doc.email);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const Validation = () => {
    const newError = {};
    const condition = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

    newError.username = user.username ? "" : "Please Enter Name";

    if (!user.email.trim()) {
      newError.email = "Please Enter Email";
    } else if (userItem.includes(user.email)) {
      newError.email = "Email has already been registered.";
    } else if (userItem.includes(user.phone)) {
      newError.phone = "Phone has already been registered.";
    } else if (!condition.test(user.password)) {
      newError.password =
        "Password must contain at least 8 characters, one uppercase letter, and one number.";
    } else if (user.password !== checkpass) {
      newError.checkpass = "Re-enter Check Pass.";
    }
    setErrors(newError);
    return Object.values(newError).some((e) => e !== "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(user.password, salt);

      const newUser = {
        ...user,
        password: hash,
      };
      if (!Validation()) {
        const account = await addDocument("accounts", newUser);
        setUser(inter);
        saveLoCal(account);
        showNotification("Registration successful", "success");
        handleClose();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="relative">
      <Dialog
        open={open_Register}
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
          style={{ fontWeight: "600", fontSize: "25px" }}
        >
          {"SIGN UP"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <TextField
              fullWidth
              id="standard-basic-name"
              onChange={handleChange}
              value={user.username}
              name="username"
              label="User Name"
              variant="standard"
              error={!!errors.username}
              helperText={errors.username}
              sx={{ paddingTop: "10px", paddingBottom: "10px" }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  document.getElementById("standard-basic-email").focus();
                }
              }}
            />
            <TextField
              fullWidth
              id="standard-basic-email"
              onChange={(e) => {
                handleChange(e);
              }}
              value={user.email}
              name="email"
              label=" Gmail"
              variant="standard"
              error={!!errors.email}
              helperText={errors.email}
              sx={{ paddingTop: "10px", paddingBottom: "10px" }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  document
                    .getElementById("standard-adornment-password")
                    .focus();
                }
              }}
            />
            <TextField
              fullWidth
              id="standard-basic-phone"
              onChange={(e) => {
                handleChange(e);
              }}
              value={user.phone}
              name="phone"
              label=" Phone"
              variant="standard"
              error={!!errors.phone}
              helperText={errors.phone}
              sx={{ paddingTop: "10px", paddingBottom: "10px" }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  document.getElementById("standard-adornment-phone").focus();
                }
              }}
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
                value={user.password}
                name="password"
                error={!!errors.password}
                helperText={errors.password}
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    document
                      .getElementById("standard-adornment-checkpassword")
                      .focus();
                  }
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword
                          ? "hide the password"
                          : "display the password"
                      }
                      onClick={handleClickShowPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {errors.password && (
                <p className="text-red-500 box-border">{errors.password}</p>
              )}
            </FormControl>
            <FormControl
              variant="standard"
              fullWidth
              sx={{ paddingTop: "10px", paddingBottom: "10px" }}
            >
              <InputLabel htmlFor="standard-adornment-checkpassword">
                Check Pass
              </InputLabel>
              <Input
                id="standard-adornment-checkpassword"
                onChange={(e) => setCheckPass(e.target.value)}
                type={showCheckPass ? "text" : "password"}
                error={!!errors.checkpass}
                helperText={errors.checkpass}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    document.getElementById("standard-basic-name").focus();
                  }
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showCheckPass
                          ? "hide the password"
                          : "display the password"
                      }
                      onClick={handleClickShowCheckPass}
                    >
                      {showCheckPass ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {errors.checkpass && (
                <p className="text-red-500 box-border">{errors.checkpass}</p>
              )}
            </FormControl>
          </DialogContentText>

          <DialogContentText>
            <div className=" text-center my-5">
              <button
                onClick={handleSubmit}
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
                <span class="relative text-base font-semibold">Sign Up</span>
              </button>
            </div>
            <DialogContentText>
              <div className="flex justify-center my-auto">
                <p
                  style={{
                    cursor: "default",
                  }}
                >
                  Already have an account?
                </p>
                <p
                  className=" ml-2 text-blue-700 hover:text-yellow-900"
                  onClick={() => {
                    handleOpen_Login();
                    handleClose();
                  }}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  Login
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
            <G_F />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Register;
