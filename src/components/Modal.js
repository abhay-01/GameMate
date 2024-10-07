import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

// Define styles for the modal box
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function MatchResultModal({ isOpen, result, onClose }) {
  const message = result === 'win' ? 'Congratulations, You won!' : 'Sorry, better luck next time';

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="match-result-title"
      aria-describedby="match-result-description"
    >
      <Box sx={style}>
        <Typography id="match-result-title" variant="h6" component="h2" textAlign="center">
          {message}
        </Typography>
        <Button
          onClick={onClose}
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
}

export default MatchResultModal;
