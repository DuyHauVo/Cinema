import React, { useContext, useState } from "react";
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
  InputLabel,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  tableCellClasses,
} from "@mui/material";
import Button_Delete from "../../Button_Delete";
import {
  addDocument,
  deleteDocument,
  updateDocument,
} from "../../../Services/Service_Firebase";
import logo from "../../../Assets/logo/services food.png";
import { ContextServices } from "../../../Context/ContextService/ServiceContext";

const inter = {
  name: "",
  describe: "",
  price: "",
};
function Servics_food(props) {
  const style = {
    display: "flex",
    width: "900px",
    flexDirection: "column",
    margin: "auto",
    gap: 2,
    marginTop: 10,
    bgcolor: "background.paper",
    p: 4,
    borderRadius: "10px",
  };

  const [open, setOpen] = useState(false);
  const [open_dele, setOpen_dele] = useState(false);
  const [service, setServices] = useState(inter);
  const [imgUpload, setImgUpload] = useState("");
  const [previewImg, setPreviewImg] = useState("");
  const [errors, setError] = useState("");
  const [dele, setDele] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");

  const handleClose = () => setOpen(false);
  const handleClose_Dele = () => setOpen_dele(false);

  const handleReset = () => {
    setOpen(true);
    setServices("");
    setPreviewImg("");
  };

  const handleEdit = (vices) => {
    setOpen(true);
    setServices(vices);
    setPreviewImg(vices.imgUrl);
    setError("");
  };

  // Connext context
  const listservice = useContext(ContextServices);
  const handleChange = (e) => {
    setServices({
      ...service,
      [e.target.name]: e.target.value,
    });
  };
  //#region ADD
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!validation()) {
        return;
      }
      if (service.id) {
        const { id, ...newObjectWithoutId } = service;
        await updateDocument(
          "services",
          service.id,
          newObjectWithoutId,
          imgUpload,
          service.imgUrl
        );
      } else {
        await addDocument("services", service, imgUpload);
      }
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  //#region DELETE
  const handleDelete = async () => {
    try {
      await deleteDocument("services", dele.id);
    } catch (error) {
      console.log(error);
    }
  };
  //#region VALIDATION
  const validation = () => {
    const newError = {};
    newError.name = service.name ? "" : "Please enter name services";
    newError.price = service.price ? "" : "Please enter price services";
    newError.describe = service.describe
      ? ""
      : "Please enter describe services";
    setError(newError);
    return !newError.name && !newError.price && !newError.describe;
  };

  //#region SEARCH
  const fillterservices = listservice.filter(
    (vice) =>
      vice.name.toLowerCase().includes(search.toLocaleLowerCase()) ||
      vice.price.toLowerCase().includes(search.toLocaleLowerCase()) ||
      vice.describe.toLowerCase().includes(search.toLocaleLowerCase())
  );

  //#region CHANGE IMG
  const handleImageChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      const render = new FileReader();
      render.onload = () => {
        setPreviewImg(render.result);
      };
      render.readAsDataURL(selected);
      setImgUpload(selected);
    } else {
      setImgUpload(null);
      setPreviewImg(null);
    }
  };
  return (
    <>
      <div className="grid grid-cols-10 gap-5 px-3 pt-1 ">
        {/* Heading spanning all 3 columns */}
        <h1 className="col-span-3 text-3xl font-bold ">List Services</h1>

        {/* Form with text input and button */}
        <form action="" className="col-span-5 flex items-center space-x-2 mr-5">
          <input
            type="text"
            className="border border-gray-300 rounded px-4 py-2 w-full"
            placeholder="Search Services"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="bg-blue-500 text-white px-5 py-2 rounded">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>

        {/* Button for opening modal */}
        <button
          className="col-span-2 bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => {
            handleReset();
          }}
        >
          ADD SERVICES
        </button>
      </div>
      <div className="p-2">
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  #
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Name Sevices
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Detail
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Image Preview
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Price
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            {fillterservices
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((vices, index) => (
                <TableBody>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">
                      {page * rowsPerPage + index + 1}
                    </TableCell>
                    <TableCell align="center">{vices.name}</TableCell>
                    <TableCell align="center">{vices.describe}</TableCell>
                    <TableCell align="center">
                      <div className="w-20 h-auto m-auto">
                        <img src={vices.imgUrl} alt="" />
                      </div>
                    </TableCell>
                    <TableCell align="center">
                      {parseInt(vices.price).toLocaleString("vi-VN") + " đ"}
                    </TableCell>
                    <TableCell align="center">
                      <div className="flex justify-center">
                        <div className="mr-2">
                          <Button
                            variant="contained"
                            color="success"
                            onClick={() => handleEdit(vices)}
                          >
                            {/* icon edit */}
                            <i class="fa-solid fa-pen-to-square p-2"></i>
                          </Button>
                        </div>
                        <div className="">
                          <Button
                            variant="outlined"
                            color="error"
                            onClick={() => {
                              setOpen_dele(true);
                              setDele(vices);
                            }}
                          >
                            {/* icon delete */}
                            <i class="fa-solid fa-trash p-2"></i>
                          </Button>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              ))}
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            rowsPerPage={rowsPerPage}
            component="div"
            page={page}
            count={listservice.length}
            onPageChange={(e, newpage) => setPage(newpage)}
            onRowsPerPageChange={(event) => {
              setRowsPerPage(parseInt(event.target.value, 10));
              setPage(0);
            }}
          />
        </TableContainer>
      </div>
      {/* Start Modal Add */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="form" sx={style} onSubmit={handleSubmit}>
          <Typography variant="h6" component="h3">
            {service.id ? "UPDATE SERVICE" : "ADD SERVICE"}
          </Typography>
          <div className="grid grid-cols-2 gap-2">
            <Box className="grid gap-3">
              <TextField
                label="Name Service"
                name="name"
                variant="outlined"
                value={service.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
              />
              <TextField
                label="Describe Service"
                name="describe"
                variant="outlined"
                multiline
                rows={3}
                value={service.describe}
                onChange={handleChange}
                error={!!errors.describe}
                helperText={errors.describe}
              />
              <TextField
                label="Price Service"
                name="price"
                variant="outlined"
                value={service.price}
                type="number"
                onChange={handleChange}
                error={!!errors.price}
                helperText={errors.price}
              />
              <TextField
                name="img"
                variant="outlined"
                type="file"
                onChange={handleImageChange}
                error={!!errors.img}
                helperText={errors.img}
              />
            </Box>
            <div>
              <img
                className="object-cover h-96"
                src={previewImg ? previewImg : `${logo}`}
                alt=""
              />
            </div>
          </div>
          <Button type="submit" variant="contained" color="primary">
            {service.id ? "UPDATE SERVICE" : "ADD SERVICE"}
          </Button>
        </Box>
      </Modal>
      {/* End Modal Add */}
      <Button_Delete
        open_dele={open_dele}
        handleClose_Dele={handleClose_Dele}
        handleDelete={handleDelete}
      />
    </>
  );
}

export default Servics_food;
