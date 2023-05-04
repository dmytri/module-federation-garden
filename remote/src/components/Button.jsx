
import "./Button.css"

import { useState } from "react"

export const Button = () => {
  const [state, setState] = useState(0)
  return (
    <div>
      <p style={{color: 'green'}}>Button v1.0.2</p>
      <button id='click-btn' className='shared-btn' onClick={() => setState((s) => s + 1)}>Click me: {state}</button>
    </div>
  )
}

export default Button