import * as React from "react";
import Link from "next/link";
import { ListItem, ListItemIcon, ListItemText, ListSubheader } from "@mui/material";
import { Dashboard, Receipt, Assignment } from "@mui/icons-material";

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
    <Link href="/abc/list" passHref>
      <ListItem button>
        <ListItemIcon>
          <Receipt />
        </ListItemIcon>
        <ListItemText primary="Advs" />
      </ListItem>
    </Link>
    <Link href="/houses" passHref>
      <ListItem button>
        <ListItemIcon>
          <Receipt />
        </ListItemIcon>
        <ListItemText primary="Houses" />
      </ListItem>
    </Link>
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
