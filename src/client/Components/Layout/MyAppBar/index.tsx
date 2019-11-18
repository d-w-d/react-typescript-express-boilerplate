import React, { useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import { Login } from 'mdi-material-ui';
import { Link } from 'react-router-dom';

import { authContext } from '@client/Contexts/AuthContext';
import { useStyles } from './styles';

interface IProps {
  appBarClass: string;
  menuButtonClass: string;
  clickHandler: any;
}

export const MyAppBar = (props: IProps) => {
  // State
  const classes = useStyles();
  const { auth, setAuth, unsetAuth } = useContext(authContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  // Misc params
  const isMenuOpen = !!anchorEl;
  const isMobileMenuOpen = !!mobileMoreAnchorEl;

  // Event handlers
  function handleProfileMenuOpen(event: React.MouseEvent<any>) {
    setAnchorEl(event.currentTarget);
  }

  function handleMobileMenuClose() {
    setMobileMoreAnchorEl(null);
  }

  function handleMenuClose() {
    setAnchorEl(null);
    handleMobileMenuClose();
  }

  function handleMobileMenuOpen(event: React.MouseEvent<any>) {
    setMobileMoreAnchorEl(event.currentTarget);
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <Link to="/" style={{ textDecoration: 'none', color: 'unset' }}>
        <MenuItem
          onClick={() => {
            console.log(':::::');
            unsetAuth();
            setAnchorEl(null);
          }}
        >
          Log out
        </MenuItem>
      </Link>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="Show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="Show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="Account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <AppBar position="fixed" className={props.appBarClass} color="primary">
        <Toolbar>
          <IconButton
            edge="start"
            className={props.menuButtonClass}
            color="inherit"
            aria-label="Open drawer"
            onClick={props.clickHandler}
          >
            <MenuIcon />
          </IconButton>
          <div
            className={'title-search-wrapper ' + classes.grow}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Typography className={classes.titlet} style={{ flex: 4 }} variant="h6" noWrap>
              {`${__SITE_SHORT_TITLE__}`}
            </Typography>

            <Typography
              className={classes.title}
              style={{ flex: 4, border: '0px red solid' }}
              variant="h6"
              noWrap
            >
              {`${__SITE_LONG_TITLE__}`}
            </Typography>

            <div className={classes.search} style={{ flex: 6, border: '0px solid green' }}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                inputProps={{ 'aria-label': 'Search' }}
              />
            </div>
          </div>

          {!!auth.username ? (
            <IconButton
              edge="end"
              aria-label="Account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          ) : (
            <Link to="/signin" style={{ textDecoration: 'none', color: 'unset' }}>
              <IconButton edge="end" color="inherit">
                <Login />
              </IconButton>
            </Link>
          )}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </>
  );
};
