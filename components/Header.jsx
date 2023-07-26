import {
  AppBar,
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  Container,
  Divider,
  IconButton,
  Slide,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
  useScrollTrigger,
} from '@mui/material'
import useGetCategoriesList from '@/hooks/useGetCategoriesList'
import logo from '@/public/logo.svg'
import { useTheme } from '@emotion/react'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import MenuIcon from '@mui/icons-material/Menu'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import Grid from '@mui/material/Unstable_Grid2' // Grid version 2
import { styled } from '@mui/material/styles'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import SearchBar from './Search/SearchBar'
import CustomTooltip from './TooltipMenu'

const NavLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  position: 'relative',
  color: theme.palette.complementary.dark,
  //   If the link is active
  '&.active, &:hover': {
    color: theme.palette.primary.main,
    '&::before': {
      height: '4px',
      content: '""',
      backgroundColor: theme.palette.primary.main,
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

export default function Header({
  openSidebar,
  setOpenSidebar,
  setOpenCartDrawer,
}) {
  // const theme = useTheme()
  const trigger = useScrollTrigger({
    threshold: 200, // Pixels scrolled before trigger is activated
    disableHysteresis: true, // Disable the "hysteresis" effect
  })
  const [showSearchBar, setshowSearchBar] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <>
      <Box component="header" id="header">
        {/* Start Top Nav*/}
        <AppBar
          elevation={0}
          position="static"
          sx={{
            visibility: {
              xs: trigger && 'hidden',
              md: 'visible',
              backgroundColor: '#ffff',
            },
          }}
        >
          <TopNavContent
            openSidebar={openSidebar}
            setOpenSidebar={setOpenSidebar}
            setOpenCartDrawer={setOpenCartDrawer}
            showSearchBar={showSearchBar}
            setshowSearchBar={setshowSearchBar}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
        </AppBar>

        <Slide
          direction="down"
          in={trigger}
          sx={{ display: { md: 'none' }, backgroundColor: '#ffff' }}
        >
          <AppBar elevation={1} sx={{}}>
            <TopNavContent
              openSidebar={openSidebar}
              setOpenSidebar={setOpenSidebar}
              setOpenCartDrawer={setOpenCartDrawer}
              showSearchBar={showSearchBar}
              setshowSearchBar={setshowSearchBar}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
            />
          </AppBar>
        </Slide>
        {/* <Grow
            in={showSearchBar}> */}
        <SearchBar
          styles={{
            width: { xs: '90%', sm: '450px' },
            position: 'fixed',
            top: '8rem',
            zIndex: 999,
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: showSearchBar && isSmallScreen ? 'flex' : 'none' || 'flex',
          }}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
        {/* </Grow> */}
        {/* End Top Nav*/}
        {/* Start Bottom Nav*/}

        <AppBar
          elevation={0}
          position="static"
          sx={{
            backgroundColor: 'white',

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
              backgroundColor: 'white',
              display: { xs: 'none', md: 'block' },
            }}
          >
            <BottomNavContent />
          </AppBar>
          {/* End Bottom Nav*/}
        </Slide>
        <Divider />
      </Box>
    </>
  )
}

function BottomNavContent() {
  const router = useRouter()
  const { categories, isError } = useGetCategoriesList()
  useEffect(() => {
    // console.log(categories)
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
      <Container sx={{}}>
        <Toolbar disableGutters sx={{}}>
          <Stack spacing={3} direction="row">
            {/* navlinks */}
            {links.map((item, index) => {
              return (
                <>
                  {item.text == 'collections' ? (
                    <CustomTooltip collections={categories}>
                      <NavLink
                        href={item.path}
                        className={pathname === item.path && 'active'}
                        key={index}
                      >
                        <Button
                          sx={{ padding: 0 }}
                          size="small"
                          endIcon={<KeyboardArrowDownIcon />}
                          disableElevation
                          disableFocusRipple
                          disableRipple
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
                        </Button>
                      </NavLink>
                    </CustomTooltip>
                  ) : (
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
                  )}
                </>
              )
            })}
          </Stack>
        </Toolbar>
      </Container>
    </>
  )
}
function TopNavContent({
  openSidebar,
  setOpenSidebar,
  setOpenCartDrawer,
  showSearchBar,
  setshowSearchBar,
  searchValue,
  setSearchValue,
}) {
  return (
    <>
      <Toolbar>
        {/* search bar for mobile view that is triggered on search icon button click */}

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
                <Link href={'/'}>
                  <Image
                    src={logo}
                    fill
                    alt="logo"
                    // sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </Link>
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
              <SearchBar
                styles={{
                  display: { xs: 'none', md: 'flex' },
                  width: '100%',
                }}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
              />
              <IconButton
                size="large"
                aria-label="Search Products"
                //   color="inherit"
                onClick={() => setshowSearchBar(!showSearchBar)}
                sx={{ display: { md: 'none' } }}
              >
                <SearchIcon fontSize="medium" />
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
                  title="Give Us A Call"
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
                      color: 'primary.main',
                    },
                  }}
                />
              </Card>
            </Grid>
            <Grid>
              <IconButton>
                <PersonOutlineOutlinedIcon sx={{ fontSize: '1.8rem' }} />
              </IconButton>
            </Grid>
            <Grid>
              <IconButton
                onClick={() => {
                  setOpenCartDrawer(true)
                }}
              >
                <ShoppingCartOutlinedIcon sx={{ fontSize: '1.8rem' }} />
              </IconButton>
            </Grid>
          </Grid>
          <Divider sx={{ display: { xs: 'none', md: 'block' } }} />
        </Container>
      </Toolbar>
    </>
  )
}
