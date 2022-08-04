import makeStyles from '../../utils/makeStyles';

const useMapPieceStyles = makeStyles({
  root: {
    position: 'absolute',
  },

  container: {
    position: 'relative',

    opacity: 0.5,

    '&:hover': {
      opacity: 1,
    },

    '&:active': {
      opacity: 1,
    },
  },

  settingsButton: {
    '&.MuiIconButton-root': {
      position: 'absolute',
      zIndex: 1,
      right: 0,

      opacity: 0.5,

      background: 'grey',
      borderRadius: '2px',
      aspectRatio: '1 / 1',
      width: 20,
      height: 20,
      padding: 0,
      color: 'white',
      border: '1px solid black',

      '& svg': {
        width: '100%',
        height: '100%',
      },

      '&:hover': {
        backgroundColor: 'rgb(89, 88, 88)',

        opacity: 1,
      },
    },
  },

  controls: {
    right: 0,
  },

  image: {
    borderWidth: 3,
    borderStyle: 'solid',
    maxWidth: '100vw',
    maxHeight: '100vh',
  },
});

export default useMapPieceStyles;
