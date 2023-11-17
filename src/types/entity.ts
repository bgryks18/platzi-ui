export interface ProductEntity {
  id: number
  title: string
  price: number
  description: string
  category: Record<string, unknown>
  images: string[]
}

export interface CategoryEntity {
  creationAt: string
  id: number
  image: string
  name: string
  updatedAt: string
}

export interface UserEntity {
  id: number
  email: string
  password: string
  name: string
  role: string
  avatar: string
}
export type Entity = ProductEntity | CategoryEntity | UserEntity
