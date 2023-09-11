import { Stack, TextField } from '@mui/material'

const CustomCounter = ({ count, setCount, ...props }) => {
  return (
    <>
      <Stack direction={'row'} {...props}>
        <button
          type="button"
          onClick={() => setCount(count !== 1 ? count - 1 : 1)}
          style={{
            fontSize: 20,
            padding: 0,
            width: 30,
            backgroundColor: 'transparent',
            outline: 'none',
            border: '1px solid gray',
            cursor: 'pointer',
          }}
        >
          -
        </button>
        <TextField
          padding={0}
          type="text"
          inputProps={{
            sx: {
              textAlign: 'center',
              width: 45,
              padding: 1,
            },
          }}
          value={count}
          onChange={(e) => {
            setCount(() => {
              if (/^[0-9\b]+$/.test(e.target.value)) {
                return Number(e.target.value < 1 ? 1 : e.target.value)
              }
              return count
            })
          }}
          variant="outlined"
        />

        <button
          type="button"
          style={{
            fontSize: 20,
            padding: 0,
            width: 30,
            backgroundColor: 'transparent',
            outline: 'none',
            border: '1px solid gray',
            cursor: 'pointer',
          }}
          onClick={() => {
            setCount(count + 1)
          }}
        >
          +
        </button>
      </Stack>
    </>
  )
}
export default CustomCounter
