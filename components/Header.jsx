import {
  AppBar,
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardHeader,
  Container,
  IconButton,
  ListItem,
  Slide,
  Stack,
  Toolbar,
  Typography,
  useScrollTrigger,
} from '@mui/material'
// Icons
import MenuIcon from '@mui/icons-material/Menu'
import PersonIcon from '@mui/icons-material/Person'
import SearchIcon from '@mui/icons-material/Search'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import Grid from '@mui/material/Unstable_Grid2' // Grid version 2
import { styled } from '@mui/material/styles'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'
import logo from '@/public/logo.svg'
import { useTheme } from '@emotion/react'
import { useEffect } from 'react'

const NavLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  position: 'relative',
  color: theme.palette.complementary.dark,
  //   If the link is active
  '&.active, &:hover': {
    color: theme.palette.primary.dark,
    '&::before': {
      height: '4px',
      content: '""',
      backgroundColor: theme.palette.primary.dark,
      position: 'Absolute',
      left: 0,
      top: theme.spacing(5.2),
      width: '100%',
    },
  },
}))

const SearchField = styled('input')(({ theme }) => ({
  backgroundColor: 'lightgrey',
  borderRadius: '20px',
  outline: 'none',
  width: '100%',
  //   height: '1.1.5rem',
  padding: '0.5rem',
  paddingInline: '1rem',
  border: 'none',
}))

export default function Header({ openSidebar, setOpenSidebar }) {
  // const theme = useTheme()
  const trigger = useScrollTrigger({
    threshold: 200, // Pixels scrolled before trigger is activated
    disableHysteresis: true, // Disable the "hysteresis" effect
  })
  return (
    <>
      <Box component="header" id="header">
        {/* Start Top Nav*/}
        <AppBar
          elevation={0}
          position='static'
          sx={{ visibility: { xs: trigger && 'hidden', md: 'visible', backgroundColor:'#ffff' } }}
        >
          <TopNavContent
            openSidebar={openSidebar}
            setOpenSidebar={setOpenSidebar}
          />
        </AppBar>

        <Slide direction="down" in={trigger} sx={{ display: { md: 'none' } ,backgroundColor:'#ffff'}}>
          <AppBar elevation={1} sx={{}}>
            <TopNavContent
              openSidebar={openSidebar}
              setOpenSidebar={setOpenSidebar}
            />
          </AppBar>
        </Slide>
        {/* End Top Nav*/}
        {/* Start Bottom Nav*/}

        <AppBar
          elevation={0}
          position="static"
          sx={{
            backgroundColor: 'complementary.light',

            visibility: trigger && 'hidden',
            display: { xs: 'none', md: 'block' },
          }}
        >
          <BottomNavContent />
        </AppBar>
        <Slide direction="down" in={trigger}>
          <AppBar
            elevation={1}
            sx={{
              backgroundColor: 'complementary.light',
              display: { xs: 'none', md: 'block' },
            }}
          >
            <BottomNavContent />
          </AppBar>
          {/* End Bottom Nav*/}
        </Slide>
      </Box>
    </>
  )
}

function BottomNavContent() {
  const router = useRouter()
  const { pathname } = router
  const links = [
    { path: '/', text: 'home' },
    { path: '/categories', text: 'categories' },
    { path: '/products', text: 'products' },
    { path: '/about', text: 'about us' },
    { path: '/contact', text: 'contact us' },
    { path: '/cart', text: 'cart' },
  ]
  return (
    <>
      <Container sx={{}}>
        <Toolbar disableGutters sx={{}}>
          <Stack spacing={3} direction="row">
            {/* navlinks */}
            {links.map((item, index) => (
              <NavLink
                href={item.path}
                className={pathname === item.path && 'active'}
                key={index}
              >
                <Typography
                  variant="subtitle1"
                  component={'span'}
                  sx={{
                    fontSize: '0.9rem',
                    textTransform: 'uppercase',
                    fontWeight: '600',
                  }}
                >
                  {item.text}
                </Typography>
              </NavLink>
            ))}
          </Stack>
        </Toolbar>
      </Container>
    </>
  )
}
function TopNavContent({ openSidebar, setOpenSidebar }) {
  return (
    <>
      <Toolbar>
        <Container>
          <Grid
            container
            spacing={{ md: 2 }}
            sx={{
              justifyContent: { xs: '', md: 'space-between' },
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Grid
              container
              direction="row"
              sx={{ flexGrow: { xs: '1', md: '' }, alignItems: 'center' }}
            >
              <IconButton
                sx={{ display: { md: 'none' } }}
                onClick={() => {
                  setOpenSidebar(!openSidebar)
                }}
              >
                <MenuIcon sx={{ fontSize: '1.5rem' }} />
              </IconButton>
              <Box
                sx={{
                  position: 'relative',
                  minWidth: '100px',
                  height: '80px',
                  display: 'none',
                  '@media(min-width:300px)': { display: 'block' },
                }}
              >
                <Image
                  src={logo}
                  fill
                  alt="logo"
                  // sizes="(max-width: 768px) 100vw, 50vw"
                />
              </Box>
            </Grid>
            <Grid
              md={5}
              sx={{
                display: 'flex',
                justifyContent: { xs: 'end', md: 'center' },
                alignItems: 'center',
              }}
            >
              <SearchField
                sx={{
                  display: { xs: 'none', md: 'inline' },
                }}
              />
              <IconButton
                size="large"
                aria-label="Search Products"
                //   color="inherit"
                sx={{ display: { md: 'none' } }}
              >
                <SearchIcon sx={{ fontSize: '1.8rem' }} />
              </IconButton>
            </Grid>
            <Grid md={''}>
              <Card elevation={0} sx={{ display: { xs: 'none', md: 'flex' } }}>
                <CardHeader
                  avatar={
                    <Avatar
                      aria-label="Call Us"
                      sx={{
                        height: 50,
                        width: 50,
                        backgroundColor: 'transparent',
                        marginRight: -2,
                      }}
                    >
                      <LocalPhoneIcon
                        sx={{ fontSize: '2rem', color: 'gray' }}
                      />
                    </Avatar>
                  }
                  title="Call Us Now"
                  subheader="+2340001122"
                  titleTypographyProps={{
                    textTransform: 'uppercase',
                    fontSize: '0.7rem',
                    fontWeight: 'bold',
                  }}
                  subheaderTypographyProps={{
                    fontSize: '1.4rem',
                    fontWeight: '600',
                    sx: {
                      color: 'primary.dark',
                    },
                  }}
                />
              </Card>
            </Grid>
            <Grid>
              <IconButton>
                <PersonIcon sx={{ fontSize: '1.5rem' }} />
              </IconButton>
            </Grid>
            <Grid>
              <IconButton>
                <ShoppingCartIcon
                  sx={{ fontSize: '1.8rem', fontSize: '1.5rem' }}
                />
              </IconButton>
            </Grid>
          </Grid>
        </Container>
      </Toolbar>
    </>
  )
}
