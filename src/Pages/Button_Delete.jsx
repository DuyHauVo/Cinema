  import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Buttons from "@mui/material/Button";

function Button_Delete({open_dele,handleClose_Dele,handleDelete}) {
  return (
    <div>
           {/* MODAL DELETE */}
           <Modal
        open={open_dele}
        onClose={handleClose_Dele}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          component="form"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ fontWeight: "Black" }}
          >
            Do you want to delete this?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Buttons
              variant="contained"
              color="error"
              onClick={async () => {
                await handleDelete();
                await handleClose_Dele();
              }}
              sx={{
                left: "80%",
              }}
            >
              <i class="fa-solid fa-check"></i>
            </Buttons>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default Button_Delete;
