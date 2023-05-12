import React from 'react'

const Footer = () => {
    const footerStyle ={
        position:"fixed",
        left: 0,
        bottom: 0,
        width: "100%",
        background:"linear-gradient(to left, yellow,red)",
    }
  return (
    <div style = {footerStyle}>
        <h2>Lê Hồng Duy</h2>
    </div>
  )
}

export default Footer;