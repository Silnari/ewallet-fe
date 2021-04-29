import { useState } from "react";
import LeftDrawer from "./LeftDrawer";
import Nav from "./Nav";

export default function HeadLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  return (
    <>
      <Nav
        drawerOpen={drawerOpen}
        handleDrawerClose={handleDrawerClose}
        handleDrawerOpen={handleDrawerOpen}
      />
      <LeftDrawer drawerOpen={drawerOpen} />
    </>
  );
}
