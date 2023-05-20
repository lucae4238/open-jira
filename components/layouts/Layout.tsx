import Head from "next/head"

import { Box } from "@mui/material"
import { PropsWithChildren } from "react"
import { Navbar, SideBar } from "../ui"

interface LayoutProps extends PropsWithChildren {
  title?: string
}

export const Layout: React.FC<LayoutProps> = ({ title = "Open Jira", children }) => {
  return (
    <Box sx={{ flexFlow: 1 }}>
      <Head>
        <title>{title}</title>
      </Head>

      <Navbar />
      <SideBar />

      <Box sx={{ padding: '10px 20px' }}>
        {children}
      </Box>

    </Box>
  )
} 