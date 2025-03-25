import React, { useContext, useState } from "react";
import { ContextUsers } from "../../../Context/Client/UserConetxt";
import {
  Button,
  TablePagination,
  Modal,
  Typography,
  TextField,
  Box,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import Button_Delete from "../../Button_Delete";
import {
  deleteDocument,
  updateDocument,
} from "../../../Services/Service_Firebase";
import { ROLES } from "../../../Utils/Contants";

function Users(props) {
  const style = {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    width: "650px",
    margin: "auto",
    marginTop: 5,
    bgcolor: "background.paper",
    p: 2,
  };

  const [open, setOpen] = useState(false);
  const [open_dele, setOpen_dele] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [dele, setDele] = useState("");
  const [user, setUser] = useState({});
  const [imgUpload, setImgUpload] = useState("");
  const [previewImg, setPreviewImg] = useState("");

  const listUsers = useContext(ContextUsers);

  const handleClose = () => setOpen(false);
  const handleClose_Dele = () => setOpen_dele(false);

  const handleDelete = async () => {
    try {
      await deleteDocument("accounts", dele);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const fillterUsers = listUsers.filter(
    (doc) =>
      doc.username.toLowerCase().includes(search.toLocaleLowerCase()) ||
      doc.email.toLowerCase().includes(search.toLocaleLowerCase()) ||
      doc.role.toLowerCase().includes(search.toLocaleLowerCase())
  );
  const handleChangeImage = (e) => {
    const selectting = e.target.files[0];
    if (selectting) {
      const render = new FileReader();
      render.onload = () => {
        setPreviewImg(render.result);
      };
      render.readAsDataURL(selectting);
      setImgUpload(selectting);
    } else {
      setPreviewImg(null);
      setImgUpload(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { id, ...newObjectWithoutId } = user;
      await updateDocument(
        "accounts",
        user.id,
        newObjectWithoutId,
        imgUpload
      );
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleResetUpdate = (doc) => {
    setOpen(true);
    setUser(doc);
    setPreviewImg(doc.imgUrl);
  };
  return (
    <>
      <div className="grid grid-cols-10 gap-5 p-5">
        {/* Heading spanning all 3 columns */}
        <h1 className="col-span-3 text-3xl font-bold ">List Users</h1>

        {/* Form with text input and button */}
        <form action="" className="col-span-5 flex items-center space-x-2 mr-5">
          <input
            type="text"
            className="border border-gray-300 rounded px-4 py-2 w-full"
            placeholder="Search Users"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="bg-blue-500 text-white px-5 py-2 rounded">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
      </div>
      <TableContainer sx={{ padding: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                #
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Image
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Name
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Email
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Phone
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Password
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Role
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fillterUsers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((doc, index) => (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{index + 1}</TableCell>

                  <TableCell align="center">
                    <img
                      className="w-20 h-auto m-auto"
                      src={doc.imgUrl}
                      alt=""
                    />
                  </TableCell>
                  <TableCell align="center">{doc.username}</TableCell>
                  <TableCell align="center">{doc.email}</TableCell>
                  <TableCell align="center">
                    {doc.phone ? (
                      doc.phone
                    ) : (
                      <>
                        <p className="text-xl text-red-500">
                          Sign in with email
                        </p>
                      </>
                    )}
                  </TableCell>

                  <TableCell align="center">
                    {doc.password ? (
                      <input
                        className="w-32 mx-auto bg-slate-300 rounded-md px-4"
                        type="password"
                        value="786312"
                        disabled
                      />
                    ) : (
                      <>
                        <p
                          className="text-xl text-red-500"
                          // style={{
                          //   backgroundImage: "linear-gradient(to right, #fa709a 0%, #fee140 100%)",
                          // }}
                        >
                          Sign in with email
                        </p>
                      </>
                    )}
                  </TableCell>
                  <TableCell align="center">{doc.role}</TableCell>

                  <TableCell align="center">
                    <div className="flex justify-center">
                      <div className="mr-2">
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => {
                            handleResetUpdate(doc);
                          }}
                        >
                          <i class="fa-solid fa-pen-to-square p-2"></i>
                        </Button>
                      </div>
                      <div className="">
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => {
                            setOpen_dele(true);
                            setDele(doc.id);
                          }}
                        >
                          {/* icon delete */}
                          <i class="fa-solid fa-trash p-2"></i>
                        </Button>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={listUsers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
          }}
        />
      </TableContainer>
      {/* Start Modal Add */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="form" sx={style} onSubmit={handleSubmit}>
          <Typography variant="h5" component="h2" gutterBottom>
            Update User
          </Typography>

          <Box className="grid grid-cols-3 gap-3">
            <Box className="grid col-span-2 gap-3">
              <TextField
                label="Name"
                name="username"
                variant="outlined"
                value={user.username}
                onChange={handleChange}
                disabled
              />
              <TextField
                label="Email"
                name="email"
                variant="outlined"
                value={user.email}
                onChange={handleChange}
                disabled
              />
              <TextField
                label="PassWord "
                name="password"
                type="password"
                variant="outlined"
                value='121212'
                onChange={handleChange}
                disabled
              />
              <TextField
                label="Phone"
                name="phone"
                variant="outlined"
                value={user.phone}
                onChange={handleChange}
              />
              <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel id="select-label" className="m-auto ">
                  Chosse Region
                </InputLabel>
                <Select
                  label="Chosse Role"
                  labelId="select-label"
                  value={user.role}
                  onChange={handleChange}
                  name="role"
                >
                  {ROLES &&
                    Object.keys(ROLES).map((ro) => <MenuItem value={ROLES[ro]}>{ROLES[ro]}</MenuItem>)}
                </Select>
              </FormControl>
            </Box>
            <Box>
              <input type="file" onChange={handleChangeImage} />
              <div className="w-32 h-auto m-auto">
                <img
                  className="mt-5"
                  src={
                    previewImg
                      ? previewImg
                      : `https://tse3.mm.bing.net/th?id=OIP.lkVN1WDlcV2jQCq-9LT7-wHaIJ&pid=Api&P=0&h=220`
                  }
                  alt=""
                />
              </div>
            </Box>
          </Box>

          <Button type="submit" variant="contained" color="primary">
            Update User
          </Button>
        </Box>
      </Modal>
      {/* End Modal Add */}

      {/* Button delete */}
      <Button_Delete
        open_dele={open_dele}
        handleClose_Dele={handleClose_Dele}
        handleDelete={handleDelete}
      />
    </>
  );
}

export default Users;
