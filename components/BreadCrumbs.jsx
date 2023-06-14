import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { Breadcrumbs, styled } from '@mui/material'
import Link from 'next/link'
const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.complementary.main,
  fontSize: 14,
  textTransform: 'capitalize',
  textDecoration: 'none',
  '&:hover': {
    color: theme.palette.primary.light,
  },
}))
const BreadCrumbs = ({ links }) => {
  return (
    <>
      <Breadcrumbs
        mt={{ md: 2 }}
        separator={<NavigateNextIcon fontSize="small" />}
      >
        {links.map((link, index) => {
          return (
            <StyledLink key={index} href={link.path}>
              {link.title}
            </StyledLink>
          )
        })}
      </Breadcrumbs>
    </>
  )
}
export default BreadCrumbs
