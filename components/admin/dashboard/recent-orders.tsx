'use client'
import { currencyFormatter } from '@/utils/currencyFormatter'
import { Button, Card, CardBody, CardHeader, Chip } from '@heroui/react'
import Link from 'next/link'
import React from 'react'

const RecentOrders = () => {
  return (
    <Card shadow="sm" className="p-3">
      <CardHeader className="justify-between items-center">
        <p className="font-semibold text-foreground text-lg">Recent Orders</p>
        <Button size="sm" variant="bordered" as={Link} href="/admin/orders">
          View All
        </Button>
      </CardHeader>
      <CardBody>
        <div className="space-y-4 h-72  overflow-y-auto">
          {Array(5)
            .fill(null)
            .map((each, index) => (
              <Card
                shadow="none"
                className="border border-foreground-200"
                key={index}
              >
                <CardHeader className="justify-between">
                  <p>ORD-00{index + 1}</p>
                  <p className="text-foreground-600">
                    {currencyFormatter((index + 1) * 10000)}
                  </p>
                </CardHeader>
                <CardBody>
                  <div className="space-y-1">
                    <div className="flex justify-between text-foreground-600">
                      <span>John Doe</span>
                      <Chip size="sm" color="warning" variant="flat">
                        Pending
                      </Chip>
                    </div>
                    <p className="text-foreground-500 text-sm">
                      20 October, 2024
                    </p>
                  </div>
                </CardBody>
              </Card>
            ))}
        </div>
      </CardBody>
    </Card>
  )
}

export default RecentOrders
