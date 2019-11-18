import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { IconButton, ListItem, ListItemIcon, ListItemText, Divider, List } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import Home from '@material-ui/icons/Home';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import LockIcon from '@material-ui/icons/Lock';
import { Cards, Translate } from 'mdi-material-ui';

import { useStyles } from '../styles';
import { authContext } from '@client/Contexts/AuthContext';

export const SideDrawer = () => {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {([
          { text: 'Home', href: '/', icon: <Home /> },
          { text: 'About', href: '/about', icon: <Cards /> },
          { text: 'Locked', href: '/locked', icon: <LockIcon />, isLocked: true },
          { text: 'Contact', href: '/contact', icon: <MailIcon /> }
        ] as ISideMenu[]).map((item, ind) => (
          <SideMenu
            key={ind}
            text={item.text}
            href={item.href}
            icon={item.icon}
            isLocked={item.isLocked}
          />
        ))}
      </List>
    </div>
  );
};

/**
 *
 * The following component creates the side-menu items
 * We have to use the labored HOC pattern here in order to style the MaterialUI
 * ListItemText. See e.g.: https://stackoverflow.com/a/56118382/8620332
 *
 */

interface ISideMenu {
  text: string;
  href: string;
  isLocked?: boolean;
  icon: JSX.Element;
  classes: any;
}

const SideMenuSansStyles = ({ text, href, icon, isLocked, classes }: ISideMenu) => {
  const { auth, setAuth } = React.useContext(authContext);
  const isIconDisabled = !auth.username && !!isLocked;

  return (
    <>
      {!!isIconDisabled ? (
        <ListItem key={text}>
          <ListItemIcon className={classes.disabledListItemIcon}>{icon}</ListItemIcon>
          <ListItemText classes={{ primary: classes.disabledListItemText }} primary={text} />
        </ListItem>
      ) : (
        <NavLink to={href} style={{ textDecoration: 'none', color: 'unset' }}>
          <ListItem button key={text}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        </NavLink>
      )}
    </>
  );
};

const sideMenuStyles = {
  disabledListItemText: {
    color: 'grey',
    cursor: 'pointer'
  },
  disabledListItemIcon: {
    color: 'grey'
  }
};

// Creates HOC with classes property injected into props
const SideMenu = withStyles(sideMenuStyles)(SideMenuSansStyles);
