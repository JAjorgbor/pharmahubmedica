'use client'
import { Button, Card, CardBody } from '@heroui/react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import type { FC, ReactNode } from 'react'
import { FiHome } from 'react-icons/fi'
import { LuRefreshCcw } from 'react-icons/lu'

interface ErrorPageWrapperProps {
  title: string
  description: string
  icon: ReactNode
  actionText?: string
  actionHref?: string
  onAction?: () => void
  showHome?: boolean
  homeHref?: string
}

const ErrorPageWrapper: FC<ErrorPageWrapperProps> = ({
  title,
  description,
  icon,
  actionText,
  actionHref,
  onAction,
  showHome = true,
  homeHref = '/',
}) => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <Card className="border-none shadow-2xl bg-background/60 backdrop-blur-md">
          <CardBody className="flex flex-col items-center text-center p-10 space-y-6">
            <div className="p-6 bg-primary/10 rounded-full text-primary">
              <div className="size-16 flex items-center justify-center">
                {icon}
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
              <p className="text-foreground-500 leading-relaxed">
                {description}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 justify-center w-full pt-4">
              {actionText && (
                <Button
                  color="primary"
                  size="lg"
                  className="px-8 font-semibold"
                  as={actionHref ? Link : undefined}
                  href={actionHref}
                  onPress={onAction}
                  startContent={!actionHref && <LuRefreshCcw size={18} />}
                >
                  {actionText}
                </Button>
              )}

              {showHome && (
                <Button
                  variant="bordered"
                  size="lg"
                  className="px-8 font-semibold"
                  as={Link}
                  href={homeHref}
                  startContent={<FiHome size={18} />}
                >
                  Back to Home
                </Button>
              )}
            </div>
          </CardBody>
        </Card>
      </motion.div>
    </div>
  )
}

export default ErrorPageWrapper
