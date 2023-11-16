export interface ProductEntity {
  id: number
  title: string
  price: number
  description: string
  category: Record<string, unknown>
  images: string[]
}

export type Entity = ProductEntity | any
