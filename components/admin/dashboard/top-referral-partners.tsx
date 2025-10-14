'use client'
import { currencyFormatter } from '@/utils/currencyFormatter'
import { Button, Card, CardBody, CardHeader, Chip } from '@heroui/react'
import Link from 'next/link'
import React from 'react'

const TopReferralPartners = () => {
  return (
    <Card shadow="sm" className="p-3">
      <CardHeader className="justify-between items-center">
        <p className="font-semibold text-foreground text-lg">
          Top Referral Partners
        </p>
        <Button
          size="sm"
          variant="bordered"
          as={Link}
          href="/admin/referral-partners"
        >
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
                <CardBody>
                  <div className="space-y-1">
                    <div className="flex justify-between text-foreground-600">
                      <div className="flex gap-2 items-center">
                        <span className="bg-primary rounded-full text-white text-lg font-semibold text-center size-8 inline-block">
                          {index + 1}
                        </span>
                        <div className="space-y-2">
                          <p className="font-semibold">John Doe</p>
                          <p>{currencyFormatter((index + 1) * 10000)}</p>
                        </div>
                      </div>
                      <p className="text-foreground-500 text-sm">
                        {(index + 1) * 10} Referrals
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
        </div>
      </CardBody>
    </Card>
  )
}

export default TopReferralPartners
