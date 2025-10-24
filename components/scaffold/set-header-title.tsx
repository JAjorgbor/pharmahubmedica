'use client'
import { setHeaderTitle } from '@/features/headerSlice'
import { useAppDispatch } from '@/features/store'
import React, { FC, useEffect } from 'react'

interface SetHeaderTitleProps {
  title: string
}

const SetHeaderTitle: FC<SetHeaderTitleProps> = ({ title }) => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(setHeaderTitle(title))
  }, [])
  return null
}

export default SetHeaderTitle
