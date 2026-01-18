'use client'

import {
  Card,
  CardBody,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@heroui/react'
import React from 'react'

export const StatsSkeleton = () => {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6">
      {[1, 2, 3, 4].map((i) => (
        <Card key={i} className="p-5 border-none shadow-sm h-[100px]">
          <CardBody className="flex flex-row items-center space-x-4">
            <Skeleton className="rounded-full w-12 h-12 flex-shrink-0" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-3 w-3/4 rounded-lg" />
              <Skeleton className="h-6 w-1/2 rounded-lg" />
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  )
}

export const ReferralsHeroSkeleton = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-3">
          <Skeleton className="h-10 w-[300px] rounded-lg" />
          <div className="flex gap-2">
            <Skeleton className="h-4 w-[80px] rounded-lg" />
            <Skeleton className="h-4 w-[120px] rounded-lg" />
          </div>
        </div>
        <Skeleton className="h-10 w-[180px] rounded-lg" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="h-[90px] p-4 bg-default-50 border border-default-100 shadow-none">
          <div className="flex items-center justify-between h-full">
            <div className="space-y-2 flex-1 outline-none">
              <Skeleton className="h-3 w-1/4 rounded-lg" />
              <Skeleton className="h-7 w-1/2 rounded-lg" />
            </div>
            <Skeleton className="h-8 w-8 rounded-lg" />
          </div>
        </Card>
        <Card className="h-[90px] p-4 bg-default-50 border border-default-100 shadow-none">
          <div className="flex items-center justify-between h-full">
            <div className="space-y-2 flex-1">
              <Skeleton className="h-3 w-1/4 rounded-lg" />
              <Skeleton className="h-5 w-3/4 rounded-lg" />
            </div>
            <Skeleton className="h-8 w-8 rounded-lg" />
          </div>
        </Card>
      </div>
      <Skeleton className="h-4 w-[400px] rounded-lg" />
    </div>
  )
}

export const TableSkeleton = ({
  rows = 5,
  columns = 4,
}: {
  rows?: number
  columns?: number
}) => {
  return (
    <Card className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <Skeleton className="h-6 w-[200px] rounded-lg" />
        <div className="flex gap-2 w-full sm:w-auto">
          <Skeleton className="h-10 w-[200px] rounded-lg" />
          <Skeleton className="h-10 w-[150px] rounded-lg" />
        </div>
      </div>
      <Table aria-label="Loading table skeleton" removeWrapper shadow="none">
        <TableHeader>
          {Array.from({ length: columns }).map((_, i) => (
            <TableColumn key={i}>
              <Skeleton className="h-4 w-2/3 rounded-lg" />
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {Array.from({ length: rows }).map((_, i) => (
            <TableRow key={i}>
              {Array.from({ length: columns }).map((_, j) => (
                <TableCell key={j}>
                  <Skeleton className="h-4 w-full rounded-lg" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}

export const OrderCardsSkeleton = () => {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="p-4 border border-default-100 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Skeleton className="h-16 w-16 rounded-xl shrink-0" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-[120px] rounded-lg" />
                <Skeleton className="h-4 w-[80px] rounded-lg" />
                <Skeleton className="h-4 w-[100px] rounded-lg" />
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Skeleton className="h-6 w-[80px] rounded-lg" />
              <Skeleton className="h-6 w-[100px] rounded-lg" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

export const OrderDetailSkeleton = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-[200px] rounded-lg" />
            <Skeleton className="h-4 w-[150px] rounded-lg" />
          </div>
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <Skeleton className="h-6 w-1/4 mb-4 rounded-lg" />
            <div className="space-y-6">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="flex gap-4 pb-4 border-b border-default-100 last:border-0"
                >
                  <Skeleton className="h-16 w-16 rounded-xl shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-1/2 rounded-lg" />
                    <Skeleton className="h-4 w-1/4 rounded-lg" />
                  </div>
                  <div className="space-y-2 flex flex-col items-end">
                    <Skeleton className="h-5 w-20 rounded-lg" />
                    <Skeleton className="h-4 w-16 rounded-lg" />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-default-100 space-y-3">
              <Skeleton className="h-4 w-full rounded-lg" />
              <Skeleton className="h-4 w-full rounded-lg" />
              <Skeleton className="h-8 w-full rounded-lg" />
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <Skeleton className="h-6 w-1/4 rounded-lg" />
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Skeleton className="h-3 w-1/2 rounded-lg" />
                <Skeleton className="h-4 w-3/4 rounded-lg" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-3 w-1/2 rounded-lg" />
                <Skeleton className="h-4 w-3/4 rounded-lg" />
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6 space-y-4">
            <Skeleton className="h-4 w-1/3 rounded-lg" />
            <div className="flex justify-between">
              <Skeleton className="h-6 w-1/2 rounded-lg" />
              <Skeleton className="h-8 w-24 rounded-full" />
            </div>
            <Skeleton className="h-10 w-full rounded-xl" />
          </Card>
          <Card className="p-6 space-y-6">
            <Skeleton className="h-4 w-1/3 rounded-lg" />
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-3">
                <Skeleton className="h-5 w-5 rounded-lg shrink-0" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-3 w-1/4 rounded-lg" />
                  <Skeleton className="h-4 w-1/2 rounded-lg" />
                </div>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  )
}
