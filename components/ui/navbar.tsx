import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import LoginIcon from "@mui/icons-material/Login";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { signIn, signOut, useSession } from "next-auth/react";
import router from "next/router";
import Link from "next/link";

const settings = ["Profile", "Logout"];

interface NavClickEvent extends React.MouseEvent<HTMLElement> {
  target: {
    innerText?: string;
    addEventListener: (
      type: string,
      callback: EventListenerOrEventListenerObject | null,
      options?: boolean | AddEventListenerOptions | undefined
    ) => void;
    dispatchEvent: (event: Event) => boolean;
    removeEventListener: (
      type: string,
      callback: EventListenerOrEventListenerObject | null,
      options?: boolean | EventListenerOptions | undefined
    ) => void;
  };
}

interface ResponsiveAppBarProps {
  className?: string;
}

const ResponsiveAppBar: React.FC<ResponsiveAppBarProps> = (props) => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const { data: session, status } = useSession();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClickNavItem = (event: NavClickEvent) => {
    switch (event.target.innerText) {
      case "Coupons":
        router.push("/coupons");
        break;

      case "Performance":
        router.push("/performance");
        break;

      case "Users":
        router.push("/users");
        break;

      case "Visitors":
        router.push("/users/visitors");
        break;

      default:
        router.push("/");
        break;
    }
  };

  const handleClickActionItem = (event: NavClickEvent) => {
    switch (event.target.innerText) {
      case "Profile":
        router.push(`/users/${session?.user.userId}`);
        break;

      case "Logout":
        signOut({ callbackUrl: "/" });
        break;

      default:
        router.push("/");
        break;
    }
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <MonetizationOnIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h4"
            noWrap
            component="div"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "harmattanB",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Link href={"/"}>Affiliate</Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleClickNavItem}>
                <Typography textAlign="center">Home</Typography>
              </MenuItem>
              {status === "authenticated" && (
                <MenuItem onClick={handleClickNavItem}>
                  <Typography textAlign="center">Coupons</Typography>
                </MenuItem>
              )}

              {["admin", "publisher"].includes(
                session?.user.privilege as string
              ) && (
                <MenuItem onClick={handleClickNavItem}>
                  <Typography textAlign="center">Performance</Typography>
                </MenuItem>
              )}

              {session?.user.privilege === "admin" && (
                <MenuItem onClick={handleClickNavItem}>
                  <Typography textAlign="center">Users</Typography>
                </MenuItem>
              )}
              {session?.user.privilege === "admin" && (
                <MenuItem onClick={handleClickNavItem}>
                  <Typography textAlign="center">Visitors</Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
          <MonetizationOnIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Typography
            variant="h4"
            noWrap
            component="div"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "harmattanB",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Link href={"/"}>Affiliate</Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={handleClickNavItem}
              sx={{
                my: 1,
                color: "white",
                display: "block",
                fontFamily: "harmattanB",
                fontSize: "1.5rem",
                textTransform: "capitalize",
              }}
            >
              Home
            </Button>
            {status === "authenticated" && (
              <Button
                onClick={handleClickNavItem}
                sx={{
                  my: 1,
                  color: "white",
                  display: "block",
                  fontFamily: "harmattanB",
                  fontSize: "1.5rem",
                  textTransform: "capitalize",
                }}
              >
                Coupons
              </Button>
            )}

            {["admin", "publisher"].includes(
              session?.user.privilege as string
            ) && (
              <Button
                onClick={handleClickNavItem}
                sx={{
                  my: 1,
                  color: "white",
                  display: "block",
                  fontFamily: "harmattanB",
                  fontSize: "1.5rem",
                  textTransform: "capitalize",
                }}
              >
                Performance
              </Button>
            )}

            {session?.user.privilege === "admin" && (
              <Button
                onClick={handleClickNavItem}
                sx={{
                  my: 1,
                  color: "white",
                  display: "block",
                  fontFamily: "harmattanB",
                  fontSize: "1.5rem",
                  textTransform: "capitalize",
                }}
              >
                Users
              </Button>
            )}
            {session?.user.privilege === "admin" && (
              <Button
                onClick={handleClickNavItem}
                sx={{
                  my: 1,
                  color: "white",
                  display: "block",
                  fontFamily: "harmattanB",
                  fontSize: "1.5rem",
                  textTransform: "capitalize",
                }}
              >
                Visitors
              </Button>
            )}
          </Box>

          {status === "authenticated" ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {session.user.image && <Avatar alt="Remy Sharp" src={session.user.image} />}
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleClickActionItem}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 0 }}>
              <Button
                variant="contained"
                startIcon={<LoginIcon />}
                onClick={() => signIn(undefined, { callbackUrl: "/coupons" })}
              >
                Login
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
