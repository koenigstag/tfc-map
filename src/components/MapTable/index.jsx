import React, { useCallback, useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';

import MapPiece from '../MapPiece';
import AddPieceForm from '../AddPieceForm';

import client from '../../localforage';
import defaultPieces from './default';

import useMapTableStyles from './MapTable.styles';

const MapTable = () => {
  const classes = useMapTableStyles();

  const [showAddPieceForm, setShowAddPieceForm] = useState(false);

  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    (async () => {
      const filesnames = await client.getItem('pieces');

      if (!filesnames) {
        setPieces(defaultPieces);
        return;
      }

      const coords = await client.getItem('piecesCoords');

      const newPieces = [];

      for (const fileName of filesnames) {
        const file = await client.getItem(fileName);

        const newPiece = {
          filename: fileName,
          imgSrc: URL.createObjectURL(file).toString(),
          defaultPos: coords[fileName],
        }

        newPieces.push(newPiece);
      }

      setPieces(newPieces);
    })();
  }, []);

  const handleAddPiece = useCallback(async (data) => {
    const filenameKeys = [];
    const newPieces = [];
    const coords = {};

    for (const file of data.files) {
      const fileKey = `${file.name}_${Date.now()}`;
      await client.setItem(fileKey, file);
      filenameKeys.push(fileKey);

      coords[fileKey] = { x: 30, y: 30 };

      const newPiece = {
        filename: fileKey,
        imgSrc: URL.createObjectURL(file).toString(),
        defaultPos: coords[fileKey],
      }

      newPieces.push(newPiece);
    }

    const prevFilenames = await client.getItem('pieces') ?? [];
    const newFilenames = [...prevFilenames];
    newFilenames.push(...filenameKeys);

    await client.setItem('pieces', newFilenames);

    const prevCoords = await client.getItem('piecesCoords') ?? {};
    const newCoords = { ...prevCoords, ...coords };
    await client.setItem('piecesCoords', newCoords);

    console.log(newPieces)

    setPieces(p => [...p, ...newPieces]);
  }, []);

  const handleOpenAddPieceForm = useCallback(() => {
    setShowAddPieceForm(true);
  }, []);

  const handleCloseAddPieceForm = useCallback(() => {
    setShowAddPieceForm(false);
  }, []);

  const onRemoveClick = useCallback(async (e, fileKey) => {
    setPieces((s) => s.filter((p, i) => p.filename !== fileKey));

    const filesnames = await client.getItem('pieces');
    const filteredFilenames = filesnames.filter(f => f !== fileKey);
    await client.setItem('pieces', filteredFilenames);

    const coords = await client.getItem('piecesCoords');
    delete coords[fileKey];
    await client.setItem('piecesCoords', { ...coords });

    await client.removeItem(fileKey);
  }, []);

  const handleCoordsChanged = useCallback(async (fileKey, { x, y }) => {
    const coords = await client.getItem('piecesCoords');
    coords[fileKey] = { x, y };
    await client.setItem('piecesCoords', { ...coords });
  }, []);

  return (
    <div className={classes.root}>
      <Box position='absolute' top='0' right='0'>
        <Button onClick={handleOpenAddPieceForm} color='secondary'>Add form</Button>
      </Box>
      <AddPieceForm open={showAddPieceForm} onClose={handleCloseAddPieceForm} onSave={handleAddPiece} />
      <div className={classes.map}>
        {pieces.map((piece) => (
          <MapPiece
            key={piece.filename}
            onRemoveClick={onRemoveClick}
            defaultPos={piece.defaultPos}
            onDragStop={handleCoordsChanged}
            {...piece}
          />
        ))}
      </div>
    </div>
  );
};

export default MapTable;
