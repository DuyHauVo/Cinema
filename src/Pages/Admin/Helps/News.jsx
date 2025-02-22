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
} from "@mui/material";
import Button_Delete from "../../Button_Delete";
import logo from "../../../Assets/logo/659a924f51c6b.png";
import {
  addDocument,
  deleteDocument,
  updateDocument,
} from "../../../Services/Service_Firebase";
import { ContextNews } from "../../../Context/ContextHelp/NewContext";

const inter = {
  name: "",
  content: "",
  date: "",
};

function News(props) {
  const style = {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    width: "850px",
    margin: "auto",
    marginTop: 10,
    bgcolor: "background.paper",
    p: 2,
  };

  const [open, setOpen] = useState(false);
  const [open_dele, setOpen_dele] = useState(false);
  const [news, setNews] = useState(inter);
  const [previewImg, setPreviewImg] = useState(null);
  const [imgUpload, setImgUpload] = useState(null);
  const [dele, setDele] = useState(null);
  const [errors, setErrors] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [search, setSearch] = useState("");

  const listNews = useContext(ContextNews);

  const handleClose = () => setOpen(false);
  const handleClose_Dele = () => setOpen_dele(false);
  const handleReset = () => {
    setOpen(true);
    setNews("");
    setPreviewImg(null);
    setImgUpload(null);
    setErrors("");
  };
  const handleEdit = (doc) => {
    setOpen(true);
    setNews(doc);
    setPreviewImg(doc.imgUrl);
    setErrors("");
  };

  const handleChange = (e) => {
    setNews({
      ...news,
      [e.target.name]: e.target.value,
    });
  };
  //   #region ADD
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!validation()) {
        return;
      }
      if (news.id) {
        const { id, ...newObjectWithoutId } = news;
        await updateDocument(
          "news",
          news.id,
          newObjectWithoutId,
          imgUpload,
          news.imgUrl
        );
      } else {
        await addDocument("news", news, imgUpload);
      }
    } catch (error) {
      console.log(error);
    }
    setOpen(false);
  };
  //   #region DELETE
  const handleDelete = async () => {
    try {
      await deleteDocument("news", dele.id);
    } catch (error) {
      console.log(error);
    }
  };
  //   #region GET IMG
  const handleChangeImage = (e) => {
    const selecting = e.target.files[0];
    if (selecting) {
      const render = new FileReader();
      render.onload = () => {
        setPreviewImg(render.result);
      };
      render.readAsDataURL(selecting);
      setImgUpload(selecting);
    } else {
      setPreviewImg(null);
      setImgUpload(null);
    }
  };
  //   #region VALIDATION
  const validation = () => {
    const NewErrors = {};
    NewErrors.name = news.name ? "" : "Please enter name";
    NewErrors.date = news.date ? "" : "Please choose date";
    NewErrors.content = news.content ? "" : "Please enter content";
    NewErrors.imgUpload = imgUpload ? "" : "Please choose img";
    setErrors(NewErrors);
    return (
      !NewErrors.name &&
      !NewErrors.date &&
      !NewErrors.content &&
      !NewErrors.imgUpload
    );
  };
  // #region SEARCH
  const fillterNews = listNews.filter(
    (doc) =>
      doc.name.toLowerCase().includes(search.toLocaleLowerCase()) ||
      doc.content.toLowerCase().includes(search.toLocaleLowerCase()) ||
      doc.date.toLowerCase().includes(search.toLocaleLowerCase())
  );

  return (
    <>
      <div className="grid grid-cols-10 gap-3 p-3  items-center">
        {/* Heading spanning all 3 columns */}
        <h1 className="col-span-3 text-3xl font-bold">List News</h1>

        {/* Form with text input and button */}
        <form action="" className="col-span-5 flex items-center space-x-2 mr-5">
          <input
            type="text"
            className="border border-gray-300 rounded px-4 py-2 w-full"
            placeholder="Search News"
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
          ADD NEWS
        </button>
      </div>
      <TableContainer sx={{ padding: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                #
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Name
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Image
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Content
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Date
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          {fillterNews
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((doc, index) => (
              <TableBody>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">
                    {page * rowsPerPage + index + 1}
                  </TableCell>
                  <TableCell align="center">{doc.name}</TableCell>
                  <TableCell align="center">
                    <img
                      className="w-full h-auto m-auto"
                      src={doc.imgUrl}
                      alt=""
                    />
                  </TableCell>
                  <TableCell align="center">{doc.content}</TableCell>

                  <TableCell align="center" className="flex-wrap">
                    {doc.date}
                  </TableCell>

                  <TableCell align="center">
                    <div className="flex justify-center">
                      <div className="mr-2">
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => {
                            handleEdit(doc);
                          }}
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
                            setDele(doc);
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
          rowsPerPageOptions={[3, 6, 9]}
          component="div"
          count={listNews.length}
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
            {news.id ? "UPDATE NEWS" : "ADD NEWS"}
          </Typography>
          <Box className="grid grid-cols-3 gap-3">
            <Box className="grid col-span-2 gap-2">
              <TextField
                label="Name"
                name="name"
                variant="outlined"
                value={news.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
              />
              <TextField
                name="date"
                type="date"
                variant="outlined"
                value={news.date}
                onChange={handleChange}
                error={!!errors.date}
                helperText={errors.date}
              />
              <TextField
                label="Content"
                name="content"
                variant="outlined"
                multiline
                rows={7}
                value={news.content}
                onChange={handleChange}
                error={!!errors.content}
                helperText={errors.content}
              />
            </Box>
            <Box className="text-center">
              <div className="mb-2 text-lg font-semibold pb-1">
                <label htmlFor="img">Choose Image Content</label>
              </div>
              <div className="relative">
                <input type="file" onChange={handleChangeImage} />
                {errors && (
                  <p className="absolute mt-2 left-1/2 transform -translate-x-1/2 text-red-600">
                    {errors.imgUpload}
                  </p>
                )}
              </div>
              <div className="w-48 h-auto mt-10 mx-auto">
                <img src={previewImg ? previewImg : logo} alt="ảnh" />
              </div>
            </Box>
          </Box>

          <Button type="submit" variant="contained" color="primary">
            {news.id ? "UPDATE NEWS" : "ADD NEWS"}
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

export default News;
