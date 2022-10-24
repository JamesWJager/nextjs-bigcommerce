import { FC, useState } from 'react'
<<<<<<< HEAD
import cn from 'clsx'
import Link from 'next/link'
import Image from 'next/image'
import s from './WishlistCard.module.css'
import { Trash } from '@components/icons'
import { Button, Text } from '@components/ui'

import { useUI } from '@components/ui/context'
import type { Product } from '@commerce/types/product'
import usePrice from '@framework/product/use-price'
import useAddItem from '@framework/cart/use-add-item'
import useRemoveItem from '@framework/wishlist/use-remove-item'
import type { WishlistItem } from '@commerce/types/wishlist'

const placeholderImg = '/product-img-placeholder.svg'

const WishlistCard: React.FC<{
  item: WishlistItem
}> = ({ item }) => {
  const product: Product = item.product
  const { price } = usePrice({
    amount: product.price?.value,
    baseAmount: product.price?.retailPrice,
    currencyCode: product.price?.currencyCode!,
  })
  // @ts-ignore Wishlist is not always enabled
  const removeItem = useRemoveItem({ wishlist: { includeProducts: true } })
  const [loading, setLoading] = useState(false)
  const [removing, setRemoving] = useState(false)

  // TODO: fix this missing argument issue
  /* @ts-ignore */
=======
import cn from 'classnames'
import Link from 'next/link'
import Image from 'next/image'
import type { WishlistItem } from '@framework/api/wishlist'
import usePrice from '@framework/use-price'
import useRemoveItem from '@framework/wishlist/use-remove-item'
import useAddItem from '@framework/cart/use-add-item'
import { useUI } from '@components/ui/context'
import { Button, Text } from '@components/ui'
import { Trash } from '@components/icons'
import s from './WishlistCard.module.css'

interface Props {
  item: WishlistItem
}

const WishlistCard: FC<Props> = ({ item }) => {
  const product = item.product!
  const { price } = usePrice({
    amount: product.prices?.price?.value,
    baseAmount: product.prices?.retailPrice?.value,
    currencyCode: product.prices?.price?.currencyCode!,
  })
  const removeItem = useRemoveItem({ includeProducts: true })
  const [loading, setLoading] = useState(false)
  const [removing, setRemoving] = useState(false)
>>>>>>> parent of f3a6202 (testing)
  const addItem = useAddItem()
  const { openSidebar } = useUI()

  const handleRemove = async () => {
    setRemoving(true)

    try {
      // If this action succeeds then there's no need to do `setRemoving(true)`
      // because the component will be removed from the view
      await removeItem({ id: item.id! })
    } catch (error) {
      setRemoving(false)
    }
  }
  const addToCart = async () => {
    setLoading(true)
    try {
      await addItem({
<<<<<<< HEAD
        productId: String(product.id),
        variantId: String(product.variants[0].id),
=======
        productId: product.entityId,
        variantId: product.variants.edges?.[0]?.node.entityId!,
>>>>>>> parent of f3a6202 (testing)
      })
      openSidebar()
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }

  return (
    <div className={cn(s.root, { 'opacity-75 pointer-events-none': removing })}>
<<<<<<< HEAD
      <div className={s.imageWrapper}>
        <Image
          width={230}
          height={230}
          src={product.images[0]?.url || placeholderImg}
          alt={product.images[0]?.alt || 'Product Image'}
        />
      </div>

      <div className={s.description}>
        <div className="flex-1 mb-6">
          <h3 className="text-2xl mb-2 -mt-1">
            <Link href={`/product${product.path}`}>
              <a>{product.name}</a>
            </Link>
          </h3>
          <div className="mb-4">
            <Text html={product.description} />
          </div>
        </div>
        <div>
          <Button
            width={260}
            aria-label="Add to Cart"
            type="button"
            onClick={addToCart}
            loading={loading}
          >
            Add to Cart
          </Button>
        </div>
      </div>
      <div className={s.actions}>
        <div className="flex justify-end font-bold">{price}</div>
        <div className="flex justify-end mt-4 lg:mt-0">
=======
      <div className={`col-span-3 ${s.productBg}`}>
        <Image
          src={product.images.edges?.[0]?.node.urlOriginal!}
          width={400}
          height={400}
          alt={product.images.edges?.[0]?.node.altText || 'Product Image'}
        />
      </div>

      <div className="col-span-7">
        <h3 className="text-2xl mb-2">
          <Link href={`/product${product.path}`}>
            <a>{product.name}</a>
          </Link>
        </h3>
        <div className="mb-4">
          <Text html={product.description} />
        </div>
        <Button
          aria-label="Add to Cart"
          type="button"
          className={
            'py-1 px-3 border border-secondary rounded-md shadow-sm hover:bg-primary-hover'
          }
          onClick={addToCart}
          loading={loading}
        >
          Add to Cart
        </Button>
      </div>
      <div className="col-span-2 flex flex-col justify-between">
        <div className="flex justify-end font-bold">{price}</div>
        <div className="flex justify-end">
>>>>>>> parent of f3a6202 (testing)
          <button onClick={handleRemove}>
            <Trash />
          </button>
        </div>
      </div>
    </div>
  )
}

export default WishlistCard
