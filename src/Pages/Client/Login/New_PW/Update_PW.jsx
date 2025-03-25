import React, { useContext, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { ContextUsers } from "../../../../Context/Client/UserConetxt";
import { updateDocument } from "../../../../Services/Service_Firebase";
import bcrypt from "bcryptjs";
import { useNotification } from "../../../../Context/Client/NotificationProvider";

function Update_PW({
  open_update,
  setOpen_Update,
  value_email,
  setOpen_Login,
}) {
  const handleClose_Update = () => setOpen_Update(false);
  const [new_password, setNew_Password] = useState({});
  const [showPassword, setShowPassword] = React.useState(false);
  const [showCheckPass, setShowCheckPass] = React.useState(false);
  const [checkpass, setCheckPass] = useState("");
  const [errors, setErrors] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowCheckPass = () => setShowCheckPass((show) => !show);

  const showNotification = useNotification();
  const userData = useContext(ContextUsers);

  const userByEmail = userData.find((e) => e.email === value_email);

  const handleChange = (e) => {
    setNew_Password({ ...new_password, [e.target.name]: e.target.value });
  };

  const Validation = () => {
    const newError = {};
    const condition = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!condition.test(new_password.password)) {
      newError.password =
        "Password must contain at least 8 characters, one uppercase letter, and one number.";
    } else if (new_password.password !== checkpass) {
      newError.checkpass = "Re-enter Check Pass.";
    }
    setErrors(newError);
    return Object.values(newError).some((e) => e !== "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(new_password.password, salt);

      const user_New_Password = {
        ...userByEmail,
        password: hash,
      };

      if (!Validation()) {
        return;
      }
      if (userByEmail) {
        await updateDocument("accounts", userByEmail, user_New_Password);
        showNotification("Code match", "success");
        setOpen_Login(true);
        setOpen_Update(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Dialog
        open={open_update}
        fullWidth
        onClose={handleClose_Update}
        sx={{
          "& .MuiPaper-root": {
            backgroundImage:
              "linear-gradient(to top, #d9afd9 0%, #97d9e1 100%)",
          },
        }}
      >
        <DialogTitle>UPDATE PASSWORD</DialogTitle>
        <DialogContent>
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
              value={new_password.password}
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Update_PW;
