import React from 'react';

export default function Footer() {
  return (
    <footer>
      <p className="center">
        &copy; PizzaMaker's Pizza {new Date().getFullYear()}
      </p>
    </footer>
  );
}
