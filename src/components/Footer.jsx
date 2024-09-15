import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p>Sviluppato da Francesco Cecca  | ⓒ {year}</p>
    </footer>
  );
}

export default Footer;
