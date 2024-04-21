import Image from 'next/image'
import { useEffect } from 'react'
import useNextBlurhash from 'use-next-blurhash'
import { urlForImage } from '@/sanity/lib/image'

function CustomImage({ asset, ...props }) {
  //   const [blurDataURL] = useNextBlurhash(image?.metadata?.blurhash)
  return (
    <>
      <Image
        src={urlForImage(asset)?.url() ?? ''}
        // blurDataURL={blurDataURL}
        {...props}
      />
    </>
  )
}
export default CustomImage
