import { FC } from 'react'
import Link from 'next/link'
<<<<<<< HEAD
import type { Product } from '@commerce/types/product'
import { Grid } from '@components/ui'
import { ProductCard } from '@components/product'
import s from './HomeAllProductsGrid.module.css'
import { getCategoryPath, getDesignerPath } from '@lib/search'
import { Brand, Category } from '@commerce/types/site'

interface Props {
  categories?: Category[]
  brands?: Brand[]
  products?: Product[]
}

const HomeAllProductsGrid: FC<Props> = ({
  categories,
  brands,
  products = [],
}) => {
=======
import { Grid } from '@components/ui'
import { SbEditableContent } from "storyblok-react"
import { ProductCard } from '@components/product'
import s from './HomeAllProductsGrid.module.css'
import { getCategoryPath, getDesignerPath } from '@lib/search'

interface Props {
  categories?: any
  brands?: any
  newestProducts?: any
  blok?: SbEditableContent
}

const Head: FC<Props> = ({ categories, brands, newestProducts, blok }) => {
  const activeProducts = blok?.products ? 
    blok?.products?.items.map((sbProduct: any) => 
      blok?.products?.fetchedItems?.find(({node}:any) => 
      node.entityId === sbProduct.id)).filter(Boolean)  
    : newestProducts;
  const activeCategories = blok?.products ? 
    blok?.categories?.items.map((sbCategory: any) => 
      blok?.categories?.fetchedItems?.find((category:any) => 
      category.entityId === sbCategory.id)).filter(Boolean)  
    : categories;

>>>>>>> parent of f3a6202 (testing)
  return (
    <div className={s.root}>
      <div className={s.asideWrapper}>
        <div className={s.aside}>
          <ul className="mb-10">
            <li className="py-1 text-base font-bold tracking-wide">
              <Link href={getCategoryPath('')}>
                <a>All Categories</a>
              </Link>
            </li>
<<<<<<< HEAD
            {categories?.map((cat: any) => (
              <li key={cat.path} className="py-1 text-accent-8 text-base">
=======
            {activeCategories.map((cat: any) => (
              <li key={cat.path} className="py-1 text-accents-8 text-base">
>>>>>>> parent of f3a6202 (testing)
                <Link href={getCategoryPath(cat.path)}>
                  <a>{cat.name}</a>
                </Link>
              </li>
            ))}
          </ul>
<<<<<<< HEAD
          <ul className="">
=======
          {(brands && brands.length) ? (<ul className="">
>>>>>>> parent of f3a6202 (testing)
            <li className="py-1 text-base font-bold tracking-wide">
              <Link href={getDesignerPath('')}>
                <a>All Designers</a>
              </Link>
            </li>
<<<<<<< HEAD
            {brands?.map(({ path, name }) => (
              <li key={path} className="py-1 text-accent-8 text-base">
                <Link href={getDesignerPath(path)}>
                  <a>{name}</a>
                </Link>
              </li>
            ))}
          </ul>
=======
            {brands.flatMap(({ node }: any) => (
              <li key={node.path} className="py-1 text-accents-8">
                <Link href={getDesignerPath(node.path)}>
                  <a>{node.name}</a>
                </Link>
              </li>
            ))}
          </ul>) : null }
>>>>>>> parent of f3a6202 (testing)
        </div>
      </div>
      <div className="flex-1">
        <Grid layout="normal">
<<<<<<< HEAD
          {products.map((product) => (
            <ProductCard
              key={product.path}
              product={product}
              variant="simple"
              imgProps={{
                width: 480,
                height: 480,
              }}
=======
          {activeProducts.map(({ node }: any) => (
            <ProductCard
              key={node.path}
              product={node}
              variant="simple"
              imgWidth={480}
              imgHeight={480}
>>>>>>> parent of f3a6202 (testing)
            />
          ))}
        </Grid>
      </div>
    </div>
  )
}

<<<<<<< HEAD
export default HomeAllProductsGrid
=======
export default Head
>>>>>>> parent of f3a6202 (testing)
