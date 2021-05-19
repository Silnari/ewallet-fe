import {
  AppBar,
  Box,
  Fade,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import { useAuth } from "../../../providers/AuthProvider";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountSelect from "../AccountSelect";

const drawerWidth = 240;

const useStyle = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  navEnd: {
    marginLeft: "auto",
  },
}));

export default function Nav({
  drawerOpen,
  handleDrawerOpen,
  handleDrawerClose,
}) {
  const classes = useStyle();
  const { logOut } = useAuth();
  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: drawerOpen,
      })}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={drawerOpen ? handleDrawerClose : handleDrawerOpen}
          edge="start"
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Fade in={!drawerOpen}>
          <Typography variant="h6" noWrap>
            eWallet
          </Typography>
        </Fade>
        <Box display="flex" className={classes.navEnd}>
          <AccountSelect />
          <IconButton color="inherit" onClick={logOut}>
            <ExitToAppIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
