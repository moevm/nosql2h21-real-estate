import * as React from "react";
import Link from "next/link";
import { ListItem, ListItemIcon, ListItemText, ListSubheader } from "@mui/material";
import { Dashboard, ShoppingCart, People, BarChart, Layers, Assignment } from "@mui/icons-material";

export const mainListItems = (
  <div>
    <Link href="/" passHref>
      <ListItem button>
        <ListItemIcon>
          <Dashboard />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
    </Link>
    {/* <Link href="/auth/signin" passHref>
      <ListItem button>
        <ListItemIcon>
          <ShoppingCart />
        </ListItemIcon>
        <ListItemText primary="signin" />
      </ListItem>
    </Link>
    <Link href="/auth/signup" passHref>
      <ListItem button>
        <ListItemIcon>
          <People />
        </ListItemIcon>
        <ListItemText primary="signup" />
      </ListItem>
    </Link>
    <Link href="/" passHref>
      <ListItem button>
        <ListItemIcon>
          <BarChart />
        </ListItemIcon>
        <ListItemText primary="Reports" />
      </ListItem>
    </Link>
    <Link href="/" passHref>
      <ListItem button>
        <ListItemIcon>
          <Layers />
        </ListItemIcon>
        <ListItemText primary="Integrations" />
      </ListItem>
    </Link> */}
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Dop list</ListSubheader>
    <Link href="/" passHref>
      <ListItem button>
        <ListItemIcon>
          <Assignment />
        </ListItemIcon>
        <ListItemText primary="some report 1" />
      </ListItem>
    </Link>
    <ListItem button>
      <ListItemIcon>
        <Assignment />
      </ListItemIcon>
      <ListItemText primary="some report 2" />
    </ListItem>
    <Link href="/" passHref>
      <ListItem button>
        <ListItemIcon>
          <Assignment />
        </ListItemIcon>
        <ListItemText primary="some report 3" />
      </ListItem>
    </Link>
  </div>
);
