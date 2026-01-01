import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react'

const useGetImageFileFromUrl = (dependant?: any) => {
  const [isFetching, setIsFetching] = useState(true)

  useEffect(() => {
    setIsFetching(true)
  }, [JSON.stringify(dependant)])

  const getImageFileFromUrl = useCallback(
    async (imageUrl: string, fileName?: string): Promise<File> => {
      const response = await fetch(
        `/api/image?url=${encodeURIComponent(imageUrl)}`
      )
      const blob = await response.blob()
      const name = fileName || imageUrl.split('/').pop() || 'image'
      setIsFetching(false)
      return new File([blob], name, { type: blob.type })
    },
    []
  )
  return { isFetching, getImageFileFromUrl }
}

export default useGetImageFileFromUrl
