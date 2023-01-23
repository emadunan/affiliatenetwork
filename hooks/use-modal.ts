import React from 'react';
import { useState } from 'react';

const useModal = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return {
    open,
    handleOpen,
    handleClose,
  }
};

export default useModal;