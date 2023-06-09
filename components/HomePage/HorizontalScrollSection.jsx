import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu'
import { useEffect, useState, useContext } from 'react'
import 'react-horizontal-scrolling-menu/dist/styles.css'
import { Button } from '@mui/material'
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined'
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined'

const HorizontalScrollSection = ({ children }) => {

  return (
    <>
      <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
        {children}
      </ScrollMenu>
    </>
  )
}
export default HorizontalScrollSection

const LeftArrow = () => {
  const { isFirstItemVisible, scrollPrev, visibleElements } =
    useContext(VisibilityContext)

  // console.log({ isFirstItemVisible });
  const [disabled, setDisabled] = useState(
    !visibleElements.length && isFirstItemVisible
  )
  useEffect(() => {
    if (visibleElements.length) {
      setDisabled(isFirstItemVisible)
    }
  }, [isFirstItemVisible, visibleElements])

  return (
    <Button
      onClick={() => {
        scrollPrev()
      }}
      disabled={disabled}
      variant={'contained'}
      color={'primary'}
      sx={{
        position: 'absolute',
        transform:'scale(0.8)',
        padding:0,
        zIndex: 100,
        height: 60,
        left: {xs:10,md:0},
        alignSelf: 'center',
        borderRadius: '50%',
        opacity: disabled ? 0 : 1,
      }}
    >
      <ArrowBackIosNewOutlinedIcon />
    </Button>
  )
}
const RightArrow = () => {
  const { isLastItemVisible, scrollNext, visibleElements } =
    useContext(VisibilityContext)

  // console.log({ isLastItemVisible });
  const [disabled, setDisabled] = useState(
    !visibleElements.length && isLastItemVisible
  )
  useEffect(() => {
    if (visibleElements.length) {
      setDisabled(isLastItemVisible)
    }
  }, [isLastItemVisible, visibleElements])

  return (
    <Button
      onClick={() => {
        scrollNext()
      }}
      disabled={disabled}
      variant={'contained'}
      color={'primary'}
      sx={{
        position: 'absolute',
        height: 65,
        transform:'scale(0.8)',
        padding:0,
        right: {xs:5, md:0},
        zIndex:100,
        alignSelf: 'center',
        borderRadius: '50%',
        opacity: disabled ? 0 : 1,
      }}
    >
      <ArrowForwardIosOutlinedIcon />
      
    </Button>
  )
}
