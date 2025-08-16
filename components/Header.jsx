import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardHeader,
  Container,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Slide,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
  useScrollTrigger,
} from '@mui/material'
import useGetCategoriesList from '@/hooks/useGetCategoriesList'
import logo from '@/public/png-transparent-logo.png'
import { useTheme } from '@emotion/react'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import MenuIcon from '@mui/icons-material/Menu'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import SearchIcon from '@mui/icons-material/Search'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import { styled } from '@mui/material/styles'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useContext, useState } from 'react'
import SearchBar from './Search/SearchBar'
import CustomTooltip from './TooltipMenu'
import { signIn, signOut, useSession } from 'next-auth/react'
import useGetContactInfo from '@/hooks/useGetContactInfo'
import { ClickAwayListener } from '@mui/material'
import { CartContext } from './Layout'

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
  const [showSearchBar, setShowSearchBar] = useState(false)
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
            setShowSearchBar={setShowSearchBar}
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
              setShowSearchBar={setShowSearchBar}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
            />
          </AppBar>
        </Slide>
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
  setShowSearchBar,
  searchValue,
  setSearchValue,
}) {
  const [anchorEl, setAnchorEl] = useState(null)
  const { data: session, status } = useSession()
  const { cart } = useContext(CartContext)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const { contactInfo } = useGetContactInfo()
  const router = useRouter()
  useEffect(() => {
    const handleRouteComplete = () => setShowSearchBar(false)
    router.events.on('routeChangeComplete', handleRouteComplete)
    return () => {
      router.events.off('routeChangeComplete', handleRouteComplete)
    }
  }, [router])
  return (
    <>
      <Toolbar>
        {/* search bar for mobile view that is triggered on search icon button click */}

        <Container>
          <Box
            container
            sx={{
              justifyContent: { xs: 'space-between' },
              display: 'flex',
              alignItems: 'center',
              width: '100%',
            }}
          >
            {/* Start menu button and logo */}
            <Box
              container
              sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}
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
                  '@media(min-width:300px)': { display: 'grid' },
                  placeItems: 'center',
                }}
              >
                <Link href={'/'}>
                  <Image src={logo} alt="Logo" width={130} height={50} />
                </Link>
              </Box>
            </Box>
            {/* End menu button and logo */}
            {/* Start search bar and search Icon */}

            {/* <Box
              md={5}
              sx={{
                flexGrow: { xs: '0.5', lg: '0.3' },
                alignItems: 'center',
              }}
            >
              <SearchBar
                styles={{
                  display: { xs: 'none', md: 'flex' },
                  marginLeft: 'auto',
                }}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
              />
            </Box> */}
            {/* Start call card, profile icon and cart icon */}

            <Box sx={{ display: 'flex', alignItems: 'center', gap: { md: 2 } }}>
              <Card elevation={0} sx={{ display: { xs: 'none', sm: 'flex' } }}>
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
                  subheader={
                    <Link
                      href={`tel:${contactInfo?.callNumber}`}
                      style={{
                        textDecoration: 'none',
                        color: 'inherit',
                        fontWeight: 'inherit',
                        fontFamily: 'inherit',
                        fontSize: 'inherit',
                      }}
                    >
                      {contactInfo?.callNumber}
                    </Link>
                  }
                  titleTypographyProps={{
                    textTransform: 'uppercase',
                    fontSize: '0.7rem',
                    fontWeight: 'bold',
                  }}
                  subheaderTypographyProps={{
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    sx: {
                      color: 'primary.main',
                    },
                  }}
                />
              </Card>
              {/* <IconButton
                size="large"
                aria-label="Search Products"
                onClick={() => setShowSearchBar(!showSearchBar)}
                sx={{ display: { md: 'none' } }}
              >
                <SearchIcon sx={{ fontSize: 25 }} />
              </IconButton> */}
              <Box>
                <IconButton onClick={handleClick}>
                  {status == 'authenticated' ? (
                    <>
                      <Avatar
                        src={session?.user?.image}
                        alt="profile photo"
                        sx={{ width: 36, height: 36 }}
                      />
                    </>
                  ) : (
                    <PersonOutlineOutlinedIcon sx={{ fontSize: '1.8rem' }} />
                  )}
                </IconButton>
                <Menu
                  id="profile-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  {status == 'authenticated' ? (
                    <MenuItem onClick={() => signOut()}>Sign Out</MenuItem>
                  ) : (
                    <MenuItem onClick={() => signIn()}>Sign In</MenuItem>
                  )}
                </Menu>
              </Box>
              <Box>
                <IconButton
                  onClick={() => {
                    setOpenCartDrawer(true)
                  }}
                >
                  <Badge color="secondary" badgeContent={cart?.length ?? 0}>
                    <ShoppingCartOutlinedIcon sx={{ fontSize: '1.8rem' }} />
                  </Badge>
                </IconButton>
              </Box>
            </Box>
            {/* End call card, profile icon and cart icon */}
          </Box>
          <Divider sx={{ display: { xs: 'none', md: 'block' } }} />
        </Container>
      </Toolbar>
    </>
  )
}
