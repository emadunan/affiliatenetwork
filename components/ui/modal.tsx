import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ReactDOM from 'react-dom';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface BasicModalProps {
  title: string;
  content: React.ReactNode;
  open: boolean;
  handleClose: () => void;
}

const BasicModal: React.FC<BasicModalProps> = ({ handleClose, open, title, content }) => open ? ReactDOM.createPortal(
  <div>
    <Modal
      open={true}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className="flex flex-col items-center justify-center">
        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ m: "auto" }}>
          {title}
        </Typography>
        <Box id="modal-modal-description" sx={{ mt: 2 }}>
          {content}
        </Box>
      </Box>
    </Modal>
  </div>, document.body
) : null;


export default BasicModal;