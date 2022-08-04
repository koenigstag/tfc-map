import React from 'react'

const Hideable = ({ children, hide = false, show = !hide }) => {
  if (hide || !show) {
    return null;
  }

  return (
    <>
      {children}
    </>
  )
}

export default Hideable;
