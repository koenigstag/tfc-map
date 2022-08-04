import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import {
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Typography,
} from '@mui/material';
import { UploadFile } from '@mui/icons-material';

const AddPieceForm = ({ open, onClose, onSave = () => {} }) => {
  const {
    watch,
    register,
    handleSubmit,
  } = useForm({
    defaultValues: {
      files: null,
    },
  });
  const files = watch('files');

  const handleSave = useCallback(
    (data) => {
      console.log(data)
      onSave(data);
      onClose();
    },
    [onSave, onClose]
  );

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add pieces form</DialogTitle>
      <DialogContent>
        <Grid container direction='column'>
          <Grid item>
          <Button
            component="label"
            variant="outlined"
            startIcon={<UploadFile />}
            sx={{ marginRight: "1rem" }}
          >
            Upload files
            <input hidden {...register('files')} type="file" multiple accept=".png" />
          </Button>
          <Typography>
            Choosed files: {(files?.length ?? 0)}
          </Typography>
          </Grid>
          <Grid item>
            <Button onClick={handleSubmit(handleSave)}>Upload</Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default AddPieceForm;
