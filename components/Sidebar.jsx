import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Toolbar,
  Typography,
  styled,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import {Fragment} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const NavLink = styled(Link)(({ theme }) => ({
  textTransform: 'uppercase',
  textDecoration: 'none',
  display: 'block',
  width: '100%',
  '&:active':{
    color:theme.palette.primary.main
  }
}))

const Sidebar = ({ sidebarWidth, openSidebar, setOpenSidebar }) => {
  const router = useRouter()
  const { pathname } = router
  const links = [
    { path: '/', text: 'home' },
    { path: '/collections', text: 'collections' },
    { path: '/about', text: 'about us' },
    { path: '/contact', text: 'contact us' },
    { path: '/cart', text: 'cart' },
  ]
  return (
    <>
      <Drawer
        anchor={'left'}
        open={openSidebar}
        onClose={() => {
          setOpenSidebar(false)
        }}
        sx={{
          width: sidebarWidth,
          flexShrink: 0,
        }}
        PaperProps={{
          sx: {
            backgroundColor: '#1c1a1a',
            width: sidebarWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar
          disableGutters
          sx={{ display: 'flex', justifyContent: 'flex-end' }}
        >
          <IconButton
            onClick={() => {
              setOpenSidebar(false)
            }}
            sx={{color:'#ffff',}}
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
        <List>
          {links.map((link, index) => (
            <Fragment key={index}>
              <ListItem sx={{ padding: 0 }}>
                <NavLink href={link.path}>
                  <ListItemButton
                    selected={link.path === pathname}
                    onClick={() => {
                      setOpenSidebar(false)
                    }}
                  >
                    <Typography
                      sx={{ p: 0, color: '#ffff', fontSize: '0.8rem' }}
                    >
                      {link.text}
                    </Typography>
                  </ListItemButton>
                </NavLink>
              </ListItem>
              <Divider sx={{backgroundColor:'complementary.dark'}}/>
            </Fragment>
          ))}
        </List>
      </Drawer>
    </>
  )
}
export default Sidebar
