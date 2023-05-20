import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { useContext } from "react";
import { UIContext } from "@/context/ui";

interface NavbarProps {

}

export const Navbar: React.FC<NavbarProps> = ({ }) => {
  const { openSideMenu } = useContext(UIContext)
  return (
    <AppBar position="sticky"  >
      <Toolbar>
        <IconButton onClick={openSideMenu} size="large" edge="start">
          <MenuOutlinedIcon />
        </IconButton>
        <Typography variant="h6">
          Open Jira
        </Typography>
      </Toolbar>

    </AppBar>
  );
};

export default Navbar