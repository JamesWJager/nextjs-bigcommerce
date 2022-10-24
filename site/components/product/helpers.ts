<<<<<<< HEAD
import type { Product } from '@commerce/types/product'
export type SelectedOptions = Record<string, string | null>
import { Dispatch, SetStateAction } from 'react'

export function getProductVariant(product: Product, opts: SelectedOptions) {
  const variant = product.variants.find((variant) => {
    return Object.entries(opts).every(([key, value]) =>
      variant.options.find((option) => {
        if (
          option.__typename === 'MultipleChoiceOption' &&
          option.displayName.toLowerCase() === key.toLowerCase()
        ) {
          return option.values.find((v) => v.label.toLowerCase() === value)
        }
      })
    )
  })
  return variant
}

export function selectDefaultOptionFromProduct(
  product: Product,
  updater: Dispatch<SetStateAction<SelectedOptions>>
) {
  // Selects the default option
  product.variants[0]?.options?.forEach((v) => {
    updater((choices) => ({
      ...choices,
      [v.displayName.toLowerCase()]: v.values[0].label.toLowerCase(),
    }))
  })
=======
import type { ProductNode } from '@framework/api/operations/get-product'

export type SelectedOptions = {
  size: string | null
  color: string | null
}

export type ProductOption = {
  displayName: string
  values: any
}

// Returns the available options of a product
export function getProductOptions(product: ProductNode) {
  const options = product.productOptions.edges?.reduce<ProductOption[]>(
    (arr, edge) => {
      if (edge?.node.__typename === 'MultipleChoiceOption') {
        arr.push({
          displayName: edge.node.displayName.toLowerCase(),
          values: edge.node.values.edges?.map((edge) => edge?.node),
        })
      }
      return arr
    },
    []
  )

  return options
}

// Finds a variant in the product that matches the selected options
export function getCurrentVariant(product: ProductNode, opts: SelectedOptions) {
  const variant = product.variants.edges?.find((edge) => {
    const { node } = edge ?? {}
    const numberOfDefinedOpts = Object.values(opts).filter(value => value !== null).length;
    const numberOfEdges = node?.productOptions?.edges?.length;

    const isEdgeEqualToOption = ([key, value]:[string, string | null]) =>
      node?.productOptions.edges?.find((edge) => {
        if (
          edge?.node.__typename === 'MultipleChoiceOption' &&
          edge.node.displayName.toLowerCase() === key
        ) {
          return edge.node.values.edges?.find(
            (valueEdge) => valueEdge?.node.label === value
          )
        }
      });

    return numberOfDefinedOpts === numberOfEdges ?
      Object.entries(opts).every(isEdgeEqualToOption)
      : Object.entries(opts).some(isEdgeEqualToOption)
  })

  return variant ?? product.variants.edges?.[0]
>>>>>>> parent of f3a6202 (testing)
}
