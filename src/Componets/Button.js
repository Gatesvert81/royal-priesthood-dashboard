import React from 'react'

function Button({ children, style, click, type, disable }) {
  return (
    <button className={style} onClick={click} type={type} disabled={disable} >
      {children}
    </button>
  )
}

export default Button