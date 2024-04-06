import React from 'react';
import { AppBar, Toolbar, Button, Menu, MenuItem } from '@mui/material';
import '../../css/Header.css';

function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <div className="logo">Restaurant Menu</div>
        <div className="menu-links">
          <Button color="inherit" href="#home">Home</Button>
          <Button color="inherit" href="#link">Link</Button>
          <Button color="inherit" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
            Menu
          </Button>
        </div>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose} href="#action/3.1">Action</MenuItem>
          <MenuItem onClick={handleClose} href="#action/3.2">Another action</MenuItem>
          <MenuItem onClick={handleClose} href="#action/3.3">Something</MenuItem>
          <MenuItem onClick={handleClose} href="#action/3.4">Separated link</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Header;