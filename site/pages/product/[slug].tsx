import type {
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next'
import { useRouter } from 'next/router'
<<<<<<< HEAD
import commerce from '@lib/api/commerce'
import { Layout } from '@components/common'
import { ProductView } from '@components/product'

export async function getStaticProps({
  params,
  locale,
  locales,
  preview,
}: GetStaticPropsContext<{ slug: string }>) {
  const config = { locale, locales }
  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  const productPromise = commerce.getProduct({
=======
import { Layout } from '@components/common'
import { ProductView } from '@components/product'

// Data

import { getConfig } from '@framework/api'
import getProduct from '@framework/api/operations/get-product'
import getAllPages from '@framework/api/operations/get-all-pages'
import getAllProductPaths from '@framework/api/operations/get-all-product-paths'
import Storyblok, { useStoryblok } from '@lib/storyblok'
import SbEditable from "storyblok-react"

export async function getStaticProps({
  params,
  locale,
  preview,
}: GetStaticPropsContext<{ slug: string }>) {
  const config = getConfig({ locale })
  let story = {}

  const { pages } = await getAllPages({ config, preview })
  const { product } = await getProduct({
>>>>>>> parent of f3a6202 (testing)
    variables: { slug: params!.slug },
    config,
    preview,
  })

<<<<<<< HEAD
  const allProductsPromise = commerce.getAllProducts({
    variables: { first: 4 },
    config,
    preview,
  })

  const { pages } = await pagesPromise
  const { categories } = await siteInfoPromise
  const { product } = await productPromise
  const { products: relatedProducts } = await allProductsPromise
=======
  const sbParams = {
    version: "draft"
  }

  try {
    const { data } = await Storyblok.get(`cdn/stories/product/${params!.slug}`, sbParams)
    if(data.story) story = data.story
  } catch(e) {
    console.error(`Product ${params!.slug} doesn't exist in Storyblok`)
  }
>>>>>>> parent of f3a6202 (testing)

  if (!product) {
    throw new Error(`Product with slug '${params!.slug}' not found`)
  }

  return {
<<<<<<< HEAD
    props: {
      pages,
      product,
      relatedProducts,
      categories,
    },
=======
    props: { pages, product, story },
>>>>>>> parent of f3a6202 (testing)
    revalidate: 200,
  }
}

export async function getStaticPaths({ locales }: GetStaticPathsContext) {
<<<<<<< HEAD
  const { products } = await commerce.getAllProductPaths()
=======
  const { products } = await getAllProductPaths()
>>>>>>> parent of f3a6202 (testing)

  return {
    paths: locales
      ? locales.reduce<string[]>((arr, locale) => {
          // Add a product path for every locale
<<<<<<< HEAD
          products.forEach((product: any) => {
            arr.push(`/${locale}/product${product.path}`)
          })
          return arr
        }, [])
      : products.map((product: any) => `/product${product.path}`),
=======
          products.forEach((product) => {
            arr.push(`/${locale}/product${product.node.path}`)
          })
          return arr
        }, [])
      : products.map((product) => `/product${product.node.path}`),
>>>>>>> parent of f3a6202 (testing)
    fallback: 'blocking',
  }
}

export default function Slug({
  product,
<<<<<<< HEAD
  relatedProducts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()

  return router.isFallback ? (
    <h1>Loading...</h1>
  ) : (
    <ProductView product={product} relatedProducts={relatedProducts} />
  )
=======
  story
}: InferGetStaticPropsType<typeof getStaticProps>) {
  // @ts-ignore 
  const liveStory = useStoryblok(story) 
  const router = useRouter()

  const hasStory = typeof liveStory.content !== 'undefined'

  if(router.isFallback) {
    return (<h1>Loading...</h1>)
  } else if (hasStory) {
    return (
      <SbEditable content={liveStory.content} key={liveStory.content._uid}>
        <ProductView product={product} story={liveStory.content} />
      </SbEditable>
    )
  }

  return (<ProductView product={product} />)
>>>>>>> parent of f3a6202 (testing)
}

Slug.Layout = Layout
