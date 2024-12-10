import React from 'react';
import { Box, Modal, Typography, Button, IconButton, TextField, Grid, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';




// Define the props for the modal
interface EditDataModalProps {
    open: boolean;
    handleClose: () => void;
    title: string;
    formData: { [key: string]: any };
    handleInputChange: (field: string, value: string) => void;
    handleSave: () => void;
}

// Style for the modal content
const modalStyle = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    borderRadius: 2,
    // pl: 4,
    // pt: 2,
    // pr: 2,
    // pb: 2,
    p: [0, 2, 2, 4],
};

const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
};

const EditDataModal: React.FC<EditDataModalProps> = ({
    open,
    handleClose,
    title,
    formData,
    handleInputChange,
    handleSave
}) => {

    return (
        <Modal
            open={open}
            onClose={() => { }}
            disableEscapeKeyDown
            BackdropProps={{ onClick: () => { } }}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box sx={modalStyle}>
                {/* Modal Header */}
                <Box sx={headerStyle}>
                    <Typography id="modal-title" variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
                        {title}
                    </Typography>

                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Divider />

                {/* Form Fields */}
                <Box component="form" sx={{ m: 2 }}>
                    <Grid container spacing={2}>
                        {Object.keys(formData).map((field) => (
                            <Grid item xs={12} sm={6} key={field}>
                                <TextField
                                    label={field.charAt(0).toUpperCase() + field.slice(1)}
                                    value={formData[field]}
                                    onChange={(e) => handleInputChange(field, e.target.value)}
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* Action Buttons */}
                <Box sx={{ textAlign: 'right', mt: 3 }}>
                    <Button variant="contained" color="primary" onClick={handleSave} sx={{ mr: 1 }}>
                        Save
                    </Button>
                    <Button variant="outlined" color='error' onClick={handleClose}>
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default EditDataModal;
