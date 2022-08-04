import React, { useCallback, useState } from 'react';
import Draggable from 'react-draggable';
import { Box, IconButton } from '@mui/material';
import { Close, Settings } from '@mui/icons-material';

import MapPieceControls from '../MapPieceControls';
import Hideable from '../Hideable';

import useMapPieceStyles from './MapPiece.styles.js';

const MapPiece = ({
  imgSrc = '',
  filename = '',
  onRemoveClick = () => {},
  defaultPos = { x: 0, y: 0 },
  onDragStop = () => {},
}) => {
  const classes = useMapPieceStyles();

  const [isDragMode, setIsDragMode] = useState(false);

  const [showMenu, setShowMenu] = useState(false);

  const handleToggleShowMenu = useCallback(() => setShowMenu((s) => !s), []);

  const handleDragModeChange = useCallback((state) => {
    setIsDragMode(state);
  }, []);

  const handleDragStop = useCallback((mouseEvent, props) => onDragStop(filename, props), [filename, onDragStop]);

  return (
    <Draggable
      disabled={!isDragMode}
      defaultPosition={defaultPos}
      onStop={handleDragStop}
    >
      <Box className={classes.root}>
        <Box className={classes.container}>
          <Hideable hide={showMenu}>
            <IconButton
              className={classes.settingsButton}
              onClick={handleToggleShowMenu}
            >
              <Settings />
            </IconButton>
          </Hideable>
          <Hideable show={showMenu}>
            <MapPieceControls
              className={classes.controls}
              additionalActions={[
                {
                  key: 'close',
                  title: 'Close',
                  content: <Close />,
                  style: {
                    marginLeft: '3px',
                  },
                },
              ]}
              onActionClicked={handleToggleShowMenu}
              isDragMode={isDragMode}
              onDragModeChange={handleDragModeChange}
              onRemoveClick={(e) => onRemoveClick(e, filename)}
            />
          </Hideable>
          <img
            draggable={false}
            className={classes.image}
            style={{
              cursor: isDragMode ? 'all-scroll' : 'auto',
              borderColor: isDragMode ? 'rgba(0, 0, 0, 0.5)' : 'transparent',
            }}
            src={imgSrc}
            alt={filename}
          />
        </Box>
      </Box>
    </Draggable>
  );
};

export default MapPiece;
