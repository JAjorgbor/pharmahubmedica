'use client'
import { Button } from '@heroui/react'
import { motion } from 'framer-motion'
import React, { FC, ReactNode } from 'react'
import { LuSearchX } from 'react-icons/lu'

interface EmptyStateProps {
  title?: string
  description?: string
  icon?: ReactNode
  buttonText?: string
  onButtonPress?: () => void
}

const EmptyState: FC<EmptyStateProps> = ({
  title = 'No items found',
  description = "We couldn't find what you're looking for. Try adjusting your filters or search criteria.",
  icon = <LuSearchX size={60} />,
  buttonText,
  onButtonPress,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-20 px-4 text-center space-y-6"
    >
      <div className="p-6 rounded-full bg-primary-50 text-primary-400">
        {icon}
      </div>
      <div className="max-w-md space-y-2">
        <h3 className="text-2xl font-bold text-foreground-800">{title}</h3>
        <p className="text-foreground-500 font-medium leading-relaxed">
          {description}
        </p>
      </div>
      {buttonText && onButtonPress && (
        <Button
          color="primary"
          variant="shadow"
          radius="full"
          className="px-8 font-bold"
          onPress={onButtonPress}
        >
          {buttonText}
        </Button>
      )}
    </motion.div>
  )
}

export default EmptyState
