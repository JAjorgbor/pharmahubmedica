import { toast } from 'react-toastify'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { Stack } from '@mui/material'

export default function (message) {
  return toast.success(
    <>
    <Stack sx={{flexDirection:'row', alignItems:'center', gap:1}}>

      <CheckCircleIcon sx={{color:'primary.main', fontSize:22}}/>
      {message}
    </Stack>
    </>,
    { icon: false }
  )
}
