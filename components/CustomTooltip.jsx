import { Divider, List, ListItem, Tooltip, Typography } from '@mui/material'
import Link from 'next/link'

const CustomTooltip = ({ children, collections = [] }) => {
  return (
    <>
      <Tooltip
        id="tooltip"
        slotProps={{
          arrow: {
            sx: {
              color: 'white',
            },
          },
          tooltip: {
            sx: {
              backgroundColor: 'white',
              padding: 0,
              boxShadow: '0px 1px 10px gray',
              // border: '1px solid black',
            },
          },
        }}
        arrow
        title={
          <>
            <List>
              {collections?.map((collection, index) => (
                <>
                  <ListItem
                    key={index}
                    sx={{
                      '&:hover': {
                        backgroundColor: 'action.hover',
                      },
                    }}
                  >
                    <Link
                      href={`collections/${collection?.slug?.current}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <Typography
                        sx={{
                          color: 'complementary.dark',
                          textTransform: 'capitalize',
                          '&:hover': { color: 'primary.main' },
                        }}
                      >
                        {collection?.title}
                      </Typography>
                    </Link>
                  </ListItem>
                  <Divider />
                </>
              ))}
            </List>
          </>
        }
      >
        {children}
      </Tooltip>
    </>
  )
}
export default CustomTooltip
