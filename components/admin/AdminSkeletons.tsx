'use client'

import { Card, CardBody, CardHeader, Skeleton } from '@heroui/react'
import React from 'react'

export const AdminStatsSkeleton = () => {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5">
      {[1, 2, 3, 4].map((i) => (
        <Card key={i} shadow="sm" className="p-3">
          <CardHeader className="justify-between">
            <Skeleton className="h-4 w-24 rounded-lg" />
            <Skeleton className="h-4 w-4 rounded-lg" />
          </CardHeader>
          <CardBody>
            <Skeleton className="h-8 w-32 rounded-lg" />
          </CardBody>
        </Card>
      ))}
    </div>
  )
}

export const RecentOrdersSkeleton = () => {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <Card key={i} shadow="none" className="border border-foreground-200">
          <CardHeader className="justify-between">
            <Skeleton className="h-4 w-20 rounded-lg" />
            <Skeleton className="h-4 w-16 rounded-lg" />
          </CardHeader>
          <CardBody>
            <div className="flex gap-4 items-center">
              <Skeleton className="size-12 rounded-lg" />
              <div className="space-y-2 flex-1">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-24 rounded-lg" />
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>
                <Skeleton className="h-3 w-16 rounded-lg" />
                <div className="flex justify-between items-end pt-2">
                  <Skeleton className="h-3 w-32 rounded-lg" />
                  <Skeleton className="h-6 w-20 rounded-lg" />
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  )
}

export const TopPartnersSkeleton = () => {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <Card key={i} shadow="none" className="border border-foreground-200">
          <CardBody>
            <div className="space-y-1">
              <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                  <Skeleton className="rounded-full size-8" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24 rounded-lg" />
                    <Skeleton className="h-3 w-16 rounded-lg" />
                  </div>
                </div>
                <div className="space-y-2 flex flex-col items-end">
                  <Skeleton className="h-4 w-20 rounded-lg" />
                  <Skeleton className="h-6 w-24 rounded-lg" />
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  )
}
