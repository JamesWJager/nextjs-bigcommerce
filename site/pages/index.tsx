<<<<<<< HEAD
import commerce from '@lib/api/commerce'
import { Layout } from '@components/common'
import { ProductCard } from '@components/product'
import { Grid, Marquee, Hero } from '@components/ui'
// import HomeAllProductsGrid from '@components/common/HomeAllProductsGrid'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
=======
import { Layout, DynamicComponent } from '@components/common'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { SbEditableContent } from "storyblok-react"
import Storyblok, { useStoryblok } from '@lib/storyblok'
import getDetailsFromStory from '@lib/storyblokBigCommerce'


import { getConfig } from '@framework/api'
>>>>>>> parent of f3a6202 (testing)

export async function getStaticProps({
  preview,
  locale,
<<<<<<< HEAD
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales }
  const productsPromise = commerce.getAllProducts({
    variables: { first: 6 },
    config,
    preview,
    // Saleor provider only
    ...({ featured: true } as any),
  })
  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  const { products } = await productsPromise
  const { pages } = await pagesPromise
  const { categories, brands } = await siteInfoPromise

  return {
    props: {
      products,
      categories,
      brands,
      pages,
    },
    revalidate: 60,
  }
}

export default function Home({
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Grid variant="filled">
        {products.slice(0, 3).map((product: any, i: number) => (
          <ProductCard
            key={product.id}
            product={product}
            imgProps={{
              width: i === 0 ? 1080 : 540,
              height: i === 0 ? 1080 : 540,
              priority: true,
            }}
          />
        ))}
      </Grid>
      <Marquee variant="secondary">
        {products.slice(0, 3).map((product: any, i: number) => (
          <ProductCard key={product.id} product={product} variant="slim" />
        ))}
      </Marquee>
      <Hero
        headline=" Dessert dragée halvah croissant."
        description="Cupcake ipsum dolor sit amet lemon drops pastry cotton candy. Sweet carrot cake macaroon bonbon croissant fruitcake jujubes macaroon oat cake. Soufflé bonbon caramels jelly beans. Tiramisu sweet roll cheesecake pie carrot cake. "
      />
      <Grid layout="B" variant="filled">
        {products.slice(0, 3).map((product: any, i: number) => (
          <ProductCard
            key={product.id}
            product={product}
            imgProps={{
              width: i === 0 ? 1080 : 540,
              height: i === 0 ? 1080 : 540,
            }}
          />
        ))}
      </Grid>
      <Marquee>
        {products.slice(3).map((product: any, i: number) => (
          <ProductCard key={product.id} product={product} variant="slim" />
        ))}
      </Marquee>
      {/* <HomeAllProductsGrid
        newestProducts={products}
        categories={categories}
        brands={brands}
      /> */}
    </>
=======
}: GetStaticPropsContext) {
  const config = getConfig({ locale })

  const sbParams = {
    version: preview ? "draft" : "published"
  }
 
  const { data: { story }} = await Storyblok.get('cdn/stories/home', sbParams)
  const copyOfStory = Object.assign({}, story)
  const fullProducts = await getDetailsFromStory({ story, config, preview })
  copyOfStory.content = fullProducts

  return {
    props: {
      story: copyOfStory,
    },
    revalidate: 14400,
  }
}

const nonNullable = (v: any) => v

export default function Home({
  story,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const liveStory = useStoryblok(story);

  const components = liveStory.content.body.map((blok: SbEditableContent) => { 
    return (<DynamicComponent blok={blok} key={blok._uid} />)
  })

  return (
    <div>
      { components }
    </div>
>>>>>>> parent of f3a6202 (testing)
  )
}

Home.Layout = Layout
