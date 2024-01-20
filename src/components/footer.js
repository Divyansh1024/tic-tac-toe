import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p style={styles.footerText}>© 2024 TicTacToe. All rights reserved.</p>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#333',
    padding: '10px',
    color: 'white',
    textAlign: 'center',
    marginTop: '20px',
  },
  footerText: {
    fontSize: '0.9rem',
  },
};

export default Footer;
