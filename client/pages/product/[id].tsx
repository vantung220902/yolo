import React from 'react'
import { getProductById, getProductIds } from '../../api/productApi'

const Product = () => {
  return (
    <div>Product</div>
  )
}

export const getStaticPaths = async () => {
  const paths = await getProductIds();
  return {
    paths,
    fallback: true
  };
}

export const getStaticProps = async ({ params }: { params: { id: string } }) => {
  const product = await getProductById(params.id);
  return {
    props: {
      product
    }
  }
}

export default Product