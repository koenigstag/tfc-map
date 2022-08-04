import React, { useCallback } from 'react';
import { Toolbar, MenuItem } from '@mui/material';
import clsx from 'clsx';

import {
  DeleteOutlineOutlined,
  MyLocationOutlined,
  OpenWithOutlined,
} from '@mui/icons-material';

import { ReactComponent as CursorIcon } from '../../assets/icons/cursor.svg';

import useMapPieceControlsStyles from './MapPieceControls.styles';
const mapControls = [
  {
    key: 'move',
    title: ({ isDragMode }) => (isDragMode ? 'Select mode' : 'Move mode'),
    content: ({ isDragMode }) =>
      isDragMode ? <CursorIcon /> : <OpenWithOutlined />,
  },
  { key: 'coords', title: 'Set coords', content: <MyLocationOutlined /> },
  { key: 'remove', title: 'Remove', content: <DeleteOutlineOutlined /> },
];

const MapPieceControls = ({
  isDragMode,
  style = {},
  className = '',
  additionalActions = [],
  onActionClicked = () => {},
  onDragModeChange = () => {},
  onRemoveClick = () => {},
}) => {

  const classes = useMapPieceControlsStyles();

  const onClickDefaultActions = [
    {
      key: 'move',
      onClick: () => {
        onDragModeChange(!isDragMode);
      },
    },
    {
      key: 'remove',
      onClick: onRemoveClick,
    },
  ];

  const handleActionClicked = useCallback(
    (callback, index) => (e) => {
      onActionClicked(e);
      callback?.(e, index);
    },
    [onActionClicked]
  );

  return (
    <Toolbar className={clsx(classes.root, className)} style={style}>
      {mapControls.concat(additionalActions).map((action) => (
        <MenuItem
          key={action.id}
          title={
            typeof action.title === 'function'
              ? action.title({ isDragMode })
              : action.title
          }
          className={clsx(classes.action, action.className)}
          {...action.props}
          onClick={handleActionClicked(
            onClickDefaultActions.find((c) => c.key === action.key)?.onClick ??
              action.props?.onClick,
          )}
        >
          {typeof action.content === 'function'
            ? action.content({ isDragMode })
            : action.content}
        </MenuItem>
      ))}
    </Toolbar>
  );
};

export default MapPieceControls;
