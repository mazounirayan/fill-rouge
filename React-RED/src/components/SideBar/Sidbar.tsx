import React, { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../theme/theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EventIcon from "@mui/icons-material/Event";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PaletteIcon from "@mui/icons-material/Palette";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import image from "../../common/img/logo.png";
import { useAuth } from "../../pages/Authentication/AuthContext"; 

interface ItemProps {
  title: string;
  to: string;
  icon: JSX.Element;
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}

const Item: React.FC<ItemProps> = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar: React.FC<{ isSidebar: boolean }> = ({ isSidebar }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(!isSidebar);
  const [selected, setSelected] = useState("Dashboard");
  const { logout } = useAuth(); // Utiliser le contexte d'authentification

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu>
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  <Box display="flex" justifyContent="center" alignItems="center">
                    <img
                      alt="profile-user"
                      width="100px"
                      height="100px"
                      src={image}
                      style={{ cursor: "pointer", borderRadius: "50%" }}
                    />
                  </Box>
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Employee Form"
              to="/employeeForm"
              icon={<PersonAddIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Sessions"
              to="/sessions"
              icon={<EventIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Create Session"
              to="/create-session"
              icon={<AddCircleOutlineIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Theme Creation"
              to="/themeCreation"
              icon={<PaletteIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Reservation Manager"
              to="/Reservation"
              icon={<PendingActionsIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <MenuItem
              icon={<ExitToAppIcon />}
              style={{
                color: colors.grey[100],
              }}
              onClick={logout} 
            >
              <Typography>Logout</Typography>
            </MenuItem>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
