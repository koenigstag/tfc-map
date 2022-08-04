import React, { useCallback, useEffect, useState } from 'react';
import MapPiece from '../MapPiece';

import client from '../../localforage';

import defaultPieces from './default';

import useMapTableStyles from './MapTable.styles';

const MapTable = () => {
  const classes = useMapTableStyles();

  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await client.getItem('pieces');

      if (data) setPieces(data);
      else setPieces(defaultPieces);
    })();
  }, []);

  const onRemoveClick = useCallback((e, index) => {
    setPieces((s) => s.filter((p, i) => i !== index));
  }, []);

  return (
    <div className={classes.root}>
      {pieces.map((piece, index) => (
        <MapPiece
          key={piece.filename}
          pieceIndex={index}
          onRemoveClick={onRemoveClick}
          {...piece}
        />
      ))}
    </div>
  );
};

export default MapTable;
