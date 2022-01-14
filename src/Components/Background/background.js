import React, { useState, useEffect, useRef } from 'react'
import WAVES from 'vanta/dist/vanta.waves.min'
// Make sure window.THREE is defined, e.g. by including three.min.js in the document head using a <script> tag

export const AnimatedBackground = (props) => {
  const [vantaEffect, setVantaEffect] = useState(0)
  const myRef = useRef(null)
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(WAVES({
        el: myRef.current,
        color: 0x3d1862,
        waveHeight: 20,
        shininess: 50,
        waveSpeed: 0.3,
        zoom: 0.75
    }))
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy()
    }
  }, [vantaEffect])
  return <div ref={myRef}>
    {props.children}
  </div>
}