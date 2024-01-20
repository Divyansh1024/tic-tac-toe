const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>Your Logo</div>
      <ul style={styles.navList}>
        <li style={styles.navItem}>Home</li>
        <li style={styles.navItem}>About</li>
        <li style={styles.navItem}>Contact</li>
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: '#333',
    padding: '10px',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  navList: {
    listStyle: 'none',
    display: 'flex',
    gap: '20px',
  },
  navItem: {
    cursor: 'pointer',
    fontSize: '1rem',
  },
};

export default Navbar;

