<<<<<<< HEAD
import { ChangeEvent, FocusEventHandler, useEffect, useState } from 'react'
import cn from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import s from './CartItem.module.css'
import { useUI } from '@components/ui/context'
import type { LineItem } from '@commerce/types/cart'
import usePrice from '@framework/product/use-price'
import useUpdateItem from '@framework/cart/use-update-item'
import useRemoveItem from '@framework/cart/use-remove-item'
import Quantity from '@components/ui/Quantity'

type ItemOption = {
  name: string
  nameId: number
  value: string
  valueId: number
}

const placeholderImg = '/product-img-placeholder.svg'

const CartItem = ({
  item,
  variant = 'default',
  currencyCode,
  ...rest
}: {
  variant?: 'default' | 'display'
  item: LineItem
  currencyCode: string
}) => {
  const { closeSidebarIfPresent } = useUI()
  const [removing, setRemoving] = useState(false)
  const [quantity, setQuantity] = useState<number>(item.quantity)
  const removeItem = useRemoveItem()
  const updateItem = useUpdateItem({ item })

  const { price } = usePrice({
    amount: item.variant.price * item.quantity,
    baseAmount: item.variant.listPrice * item.quantity,
    currencyCode,
  })

  const handleChange = async ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(value))
    await updateItem({ quantity: Number(value) })
  }

  const increaseQuantity = async (n = 1) => {
    const val = Number(quantity) + n
    setQuantity(val)
    await updateItem({ quantity: val })
  }

  const handleRemove = async () => {
    setRemoving(true)
    try {
      await removeItem(item)
=======
import { ChangeEvent, useEffect, useState } from 'react'
import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { Trash, Plus, Minus } from '@components/icons'
import usePrice from '@framework/use-price'
import useUpdateItem from '@framework/cart/use-update-item'
import useRemoveItem from '@framework/cart/use-remove-item'
import s from './CartItem.module.css'

type ItemOption = {
  name: string,
  nameId: number,
  value: string,
  valueId: number
}

const CartItem = ({
  item,
  currencyCode,
}: {
  item: any
  currencyCode: string
}) => {
  const { price } = usePrice({
    amount: item.extended_sale_price,
    baseAmount: item.extended_list_price,
    currencyCode,
  })
  const updateItem = useUpdateItem(item)
  const removeItem = useRemoveItem()
  const [quantity, setQuantity] = useState(item.quantity)
  const [removing, setRemoving] = useState(false)
  const updateQuantity = async (val: number) => {
    await updateItem({ quantity: val })
  }
  const handleQuantity = (e: ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value)

    if (Number.isInteger(val) && val >= 0) {
      setQuantity(e.target.value)
    }
  }
  const handleBlur = () => {
    const val = Number(quantity)

    if (val !== item.quantity) {
      updateQuantity(val)
    }
  }
  const increaseQuantity = (n = 1) => {
    const val = Number(quantity) + n

    if (Number.isInteger(val) && val >= 0) {
      setQuantity(val)
      updateQuantity(val)
    }
  }
  const handleRemove = async () => {
    setRemoving(true)

    try {
      // If this action succeeds then there's no need to do `setRemoving(true)`
      // because the component will be removed from the view
      await removeItem({ id: item.id })
>>>>>>> parent of f3a6202 (testing)
    } catch (error) {
      setRemoving(false)
    }
  }

<<<<<<< HEAD
  // TODO: Add a type for this
  const options = (item as any).options

=======
>>>>>>> parent of f3a6202 (testing)
  useEffect(() => {
    // Reset the quantity state if the item quantity changes
    if (item.quantity !== Number(quantity)) {
      setQuantity(item.quantity)
    }
<<<<<<< HEAD
    // TODO: currently not including quantity in deps is intended, but we should
    // do this differently as it could break easily
    // eslint-disable-next-line react-hooks/exhaustive-deps
=======
>>>>>>> parent of f3a6202 (testing)
  }, [item.quantity])

  return (
    <li
<<<<<<< HEAD
      className={cn(s.root, {
        'opacity-50 pointer-events-none': removing,
      })}
      {...rest}
    >
      <div className="flex flex-row space-x-4 py-4">
        <div className="w-16 h-16 bg-violet relative overflow-hidden cursor-pointer z-0">
          <Link href={`/product/${item.path}`}>
            <a>
              <Image
                onClick={() => closeSidebarIfPresent()}
                className={s.productImage}
                width={150}
                height={150}
                src={item.variant.image?.url || placeholderImg}
                alt={item.variant.image?.alt || 'Product Image'}
                unoptimized
              />
            </a>
          </Link>
        </div>
        <div className="flex-1 flex flex-col text-base">
          <Link href={`/product/${item.path}`}>
            <a>
              <span
                className={s.productName}
                onClick={() => closeSidebarIfPresent()}
              >
                {item.name}
              </span>
            </a>
          </Link>
          {options && options.length > 0 && (
            <div className="flex items-center pb-1">
              {options.map((option: ItemOption, i: number) => (
                <div
                  key={`${item.id}-${option.name}`}
                  className="text-sm font-semibold text-accent-7 inline-flex items-center justify-center"
                >
                  {option.name}
                  {option.name === 'Color' ? (
                    <span
                      className="mx-2 rounded-full bg-transparent border w-5 h-5 p-1 text-accent-9 inline-flex items-center justify-center overflow-hidden"
                      style={{
                        backgroundColor: `${option.value}`,
                      }}
                    ></span>
                  ) : (
                    <span className="mx-2 rounded-full bg-transparent border h-5 p-1 text-accent-9 inline-flex items-center justify-center overflow-hidden">
                      {option.value}
                    </span>
                  )}
                  {i === options.length - 1 ? '' : <span className="mr-3" />}
                </div>
              ))}
            </div>
          )}
          {variant === 'display' && (
            <div className="text-sm tracking-wider">{quantity}x</div>
          )}
        </div>
        <div className="flex flex-col justify-between space-y-2 text-sm">
          <span>{price}</span>
        </div>
      </div>
      {variant === 'default' && (
        <Quantity
          value={quantity}
          handleRemove={handleRemove}
          handleChange={handleChange}
          increase={() => increaseQuantity(1)}
          decrease={() => increaseQuantity(-1)}
        />
      )}
=======
      className={cn('flex flex-row space-x-8 py-8', {
        'opacity-75 pointer-events-none': removing,
      })}
    >
      <div className="w-16 h-16 bg-violet relative overflow-hidden">
        <Image
          className={s.productImage}
          src={item.image_url}
          width={150}
          height={150}
          alt="Product Image"
          // The cart item image is already optimized and very small in size
          unoptimized
        />
      </div>
      <div className="flex-1 flex flex-col text-base">
        {/** TODO: Replace this. No `path` found at Cart */}
        <Link href={`/product/${item.url.split('/')[3]}`}>
          <span className="font-bold text-lg cursor-pointer leading-6">
            {item.name}
          </span>
        </Link>
        {item.options && item.options.length > 0 ? (
          <div className="">
            {item.options.map((option:ItemOption, i: number) =>
              <span key={`${item.id}-${option.name}`} className="text-sm font-semibold text-accents-7">
                {option.value}{ i === item.options.length -1 ? "" : ", " }
              </span>
            )}
          </div>
        ) : null}
        <div className="flex items-center mt-3">
          <button type="button" onClick={() => increaseQuantity(-1)}>
            <Minus width={18} height={18} />
          </button>
          <label>
            <input
              type="number"
              max={99}
              min={0}
              className={s.quantity}
              value={quantity}
              onChange={handleQuantity}
              onBlur={handleBlur}
            />
          </label>
          <button type="button" onClick={() => increaseQuantity(1)}>
            <Plus width={18} height={18} />
          </button>
        </div>
      </div>
      <div className="flex flex-col justify-between space-y-2 text-base">
        <span>{price}</span>
        <button className="flex justify-end" onClick={handleRemove}>
          <Trash />
        </button>
      </div>
>>>>>>> parent of f3a6202 (testing)
    </li>
  )
}

export default CartItem
