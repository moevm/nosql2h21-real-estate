import React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Link from "next/link";

type LinkTabProps = {
  label: string;
  href: string;
};
type Props = {
  tabs: LinkTabProps[];
  value: number;
};

function LinkTab(props: LinkTabProps) {
  const { label, href } = props;
  return (
    <Link href={href} passHref>
      <Tab
        component="a"
        // onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
        //   event.preventDefault();
        // }}
        label={label}
      />
    </Link>
  );
}

const NavTabs: React.FC<Props> = (props) => {
  const { tabs, value } = props;

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs value={value} aria-label="nav tabs example">
        {tabs.map((tab, idx) => (
          <LinkTab key={idx + tab.href} label={tab.label} href={tab.href} />
        ))}
      </Tabs>
    </Box>
  );
};

export default NavTabs;
