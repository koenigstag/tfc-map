import makeStyles from "../../utils/makeStyles";

const useMapPieceControlsStyles = makeStyles({
  root: {
    '&.MuiToolbar-root':{
      display: 'flex',
      flexFlow: 'row nowrap',

      padding: 0,
      minHeight: 'auto',
      position: 'absolute',
    }
  },

  action: {
    zIndex: 1,

    '&.MuiMenuItem-root': {
      border: '1px solid black',
      width: 20,
      aspectRatio: '1 / 1',
      padding: 0,
      background: 'grey',
      color: 'white',
      borderRadius: '2px',

      '&:hover': {
        backgroundColor: 'rgb(89, 88, 88)',
      },

      '& svg': {
        width: '100%',
        height: '100%',
      },
    }
  },
});

export default useMapPieceControlsStyles;
