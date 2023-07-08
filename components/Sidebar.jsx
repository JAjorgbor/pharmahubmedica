import {
  Collapse,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  styled,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import { Fragment, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import useGetCategories from '@/hooks/useGetCategories'

const NavLink = styled(Link)(({ theme }) => ({
  textTransform: 'uppercase',
  textDecoration: 'none',
  display: 'block',
  width: '100%',
  '&:active': {
    color: theme.palette.primary.main,
  },
}))

const Sidebar = ({ sidebarWidth, openSidebar, setOpenSidebar }) => {
  const router = useRouter()
  const { categories, isError } = useGetCategories()
  const [openCollapse, setOpenCollapse] = useState(false)
  useEffect(() => {
    if (isError) {
      console.error(isError)
    }
  }, [categories, isError])

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
            // backgroundColor: 'complementary.main',
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
            sx={{ color: '#ffff' }}
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
        <List>
          {links.map((item, index) => (
            <Fragment key={index}>
              {item.text === 'collections' ? (
                <>
                  <ListItem
                    sx={{ padding: 0 }}
                    secondaryAction={
                      <IconButton
                        onClick={() => setOpenCollapse(!openCollapse)}
                        sx={{ color: 'white' }}
                      >
                        {openCollapse ? <ExpandLess /> : <ExpandMore />}
                      </IconButton>
                    }
                  >
                    <NavLink href={item.path}>
                      <ListItemButton
                        // sx={{ padding: 0 }}
                        selected={item.path === pathname}
                        onClick={() => {
                          setOpenSidebar(false)
                        }}
                      >
                        <Typography
                          sx={{ p: 0, color: '#ffff', fontSize: '0.8rem' }}
                        >
                          {item.text}
                        </Typography>
                      </ListItemButton>
                    </NavLink>
                  </ListItem>
                  <Collapse in={openCollapse} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {categories?.map((category, index) => (
                        <ListItemButton
                          key={index}
                          sx={{ pl: 4 }}
                          selected={
                            `/collections/${category?.slug?.current}` ===
                            pathname
                          }
                          onClick={() => {
                            setOpenSidebar(false)
                            console.log(
                              `/collections/${category?.slug?.current}` ===
                                pathname
                            )
                          }}
                        >
                          <NavLink
                            href={`/collections/${category?.slug?.current}`}
                          >
                            <Typography
                              sx={{
                                padding: 0,
                                color: '#ffff',
                                fontSize: '0.8rem',
                              }}
                            >
                              {category?.title}
                            </Typography>
                          </NavLink>
                        </ListItemButton>
                      ))}
                    </List>
                  </Collapse>
                </>
              ) : (
                <ListItem sx={{ padding: 0 }}>
                  <NavLink href={item.path}>
                    <ListItemButton
                      selected={item.path === pathname}
                      onClick={() => {
                        setOpenSidebar(false)
                      }}
                    >
                      <Typography
                        sx={{ p: 0, color: '#ffff', fontSize: '0.8rem' }}
                      >
                        {item.text}
                      </Typography>
                    </ListItemButton>
                  </NavLink>
                </ListItem>
              )}
              <Divider sx={{ backgroundColor: 'complementary.dark' }} />
            </Fragment>
          ))}
        </List>
      </Drawer>
    </>
  )
}
export default Sidebar
