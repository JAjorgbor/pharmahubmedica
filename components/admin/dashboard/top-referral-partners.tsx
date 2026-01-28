'use client'
import { useGetTopReferralPartners } from '@/hooks/requests/admin/useGetTopReferrals'
import { currencyFormatter } from '@/utils/currency-formatter'
import { Button, Card, CardBody, CardHeader, Chip } from '@heroui/react'
import Link from 'next/link'
import React from 'react'
import { TopPartnersSkeleton } from '@/components/admin/AdminSkeletons'
import { LuUsers } from 'react-icons/lu'

const TopReferralPartners = () => {
  const { topReferralPartners, topReferralPartnersLoading } =
    useGetTopReferralPartners()
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
        <div className="space-y-4 h-96 overflow-y-auto">
          {topReferralPartnersLoading ? (
            <TopPartnersSkeleton />
          ) : topReferralPartners?.length > 0 ? (
            topReferralPartners?.map((each, index) => (
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
                          <p className="font-semibold">
                            {each?.user?.firstName} {each?.user?.lastName}
                          </p>
                          <p>{currencyFormatter(each?.commissionTotal)}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <span className="text-secondary text-sm font-semibold block">
                          {each?.referralsCount} Referrals
                        </span>
                        <Button
                          size="sm"
                          color="primary"
                          variant="light"
                          as={Link}
                          href={`/admin/referral-partners/${each?._id}`}
                          className="h-6"
                        >
                          View Profile
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-foreground-500">
              <LuUsers size={40} className="mb-2" />
              <p>No referral partners yet</p>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  )
}

export default TopReferralPartners
