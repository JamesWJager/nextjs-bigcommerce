import type { GetStaticPropsContext } from 'next'
<<<<<<< HEAD
import useCustomer from '@framework/customer/use-customer'
import commerce from '@lib/api/commerce'
=======
import { getConfig } from '@framework/api'
import getAllPages from '@framework/api/operations/get-all-pages'
import useCustomer from '@framework/use-customer'
>>>>>>> parent of f3a6202 (testing)
import { Layout } from '@components/common'
import { Container, Text } from '@components/ui'

export async function getStaticProps({
  preview,
  locale,
<<<<<<< HEAD
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales }
  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  const { pages } = await pagesPromise
  const { categories } = await siteInfoPromise

  return {
    props: { pages, categories },
=======
}: GetStaticPropsContext) {
  const config = getConfig({ locale })
  const { pages } = await getAllPages({ config, preview })
  return {
    props: { pages },
>>>>>>> parent of f3a6202 (testing)
  }
}

export default function Profile() {
  const { data } = useCustomer()
  return (
<<<<<<< HEAD
    <Container className="pt-4">
      <Text variant="pageHeading">My Profile</Text>
      <div className="grid grid-cols-4">
        {data && (
          <div className="flex flex-col divide-accent-2 divide-y">
            <div className="flex flex-row items-center space-x-4 py-4">
              <span className="text-lg font-medium text-accent-600 flex-1">
                Full Name
              </span>
=======
    <Container>
      <Text variant="pageHeading">My Profile</Text>
      {data && (
        <div className="grid lg:grid-cols-12">
          <div className="lg:col-span-8 pr-4">
            <div>
              <Text variant="sectionHeading">Full Name</Text>
>>>>>>> parent of f3a6202 (testing)
              <span>
                {data.firstName} {data.lastName}
              </span>
            </div>
<<<<<<< HEAD
            <div className="flex flex-row items-center space-x-4 py-4">
              <span className="text-lg font-medium text-accent-600 flex-1">
                Email
              </span>
              <span>{data.email}</span>
            </div>
          </div>
        )}
      </div>
=======
            <div className="mt-5">
              <Text variant="sectionHeading">Email</Text>
              <span>{data.email}</span>
            </div>
          </div>
        </div>
      )}
>>>>>>> parent of f3a6202 (testing)
    </Container>
  )
}

Profile.Layout = Layout
