'use client'
import { Card, CardBody, CardHeader } from '@heroui/react'
import React, { FC } from 'react'
import { IconType } from 'react-icons/lib'

interface StatCardProps {
  title: string
  icon: IconType
  value: string
}

const StatCard: FC<StatCardProps> = ({ title, icon, value }) => {
  const Icon = icon
  return (
    <Card shadow="sm" className="p-3">
      <CardHeader className="justify-between">
        <p className="text-sm">{title}</p>
        <Icon size={16} className="text-primary" />
      </CardHeader>
      <CardBody>
        <h2 className="text-xl font-semibold">{value}</h2>
      </CardBody>
    </Card>
  )
}

export default StatCard
