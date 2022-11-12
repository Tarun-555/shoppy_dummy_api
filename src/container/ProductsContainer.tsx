import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../components/Card';
import styled from 'styled-components';
import { colors } from '../constants';
import loader from '../assets/icons/load.gif';

export interface product {
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  id: number;
  images: any;
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
}

interface IProductContainer {
  search: string;
}

const ProductsContainer = ({ search }: IProductContainer) => {
  const [products, setProducts] = useState<product[]>([]);
  const [searchedProducts, setSearchedProduct] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const fetchProducts = () => {
    axios
      .get(
        `https://dummyjson.com/products?limit=15&skip=${
          currentPage * 15
        }&select=title,price,description,thumbnail,rating,id`
      )
      .then((data) => {
        console.log(data);
        setProducts(data.data.products);
        setIsLoading(false);
      });
  };

  const fetchProductsBasedonSearch = () => {
    axios
      .get(`https://dummyjson.com/products/search?q=${search}`)
      .then((data) => {
        console.log('sear', data);
        setSearchedProduct(data.data.products);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    fetchProducts();
  }, [currentPage]);

  useEffect(() => {
    if (search !== '') {
      fetchProductsBasedonSearch();
    }
  }, [search]);

  const handlePagination = (mode: string) => {
    if (mode == 'prev') {
      currentPage !== 1 && setCurrentPage((prevPage) => prevPage - 1);
    }
    if (mode == 'next') {
      currentPage !== 5 && setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleClearSearchResults = () => {
    setSearchedProduct([]);
  };

  return (
    <Container>
      {isLoading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img src={loader} />
        </div>
      ) : (
        <ProductContainer>
          {searchedProducts.length > 0 ? (
            <Btn onClick={handleClearSearchResults}>Clear Search Results</Btn>
          ) : null}
          <ProductsWrapper>
            {searchedProducts.length > 0
              ? searchedProducts.map((product) => {
                  return <Card Item={product} />;
                })
              : products.length > 0 &&
                products.map((product) => {
                  return <Card Item={product} />;
                })}
          </ProductsWrapper>
          {searchedProducts.length === 0 && (
            <PaginationBtnWrapper>
              <PaginationBtn
                onClick={() => handlePagination('prev')}
                disabled={currentPage == 1}
              >
                prev
              </PaginationBtn>
              <PaginationBtn
                onClick={() => handlePagination('next')}
                disabled={currentPage == 5}
              >
                next
              </PaginationBtn>
            </PaginationBtnWrapper>
          )}
        </ProductContainer>
      )}
    </Container>
  );
};

const Container = styled.div`
  padding: 10px 20px;
  padding-top: 120px;
  @media (max-width: 500px) {
    padding: 10px 0px;
    padding-top: 120px;
  }
`;

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProductsWrapper = styled.div`
  display: flex;
  gap: 50px;
  flex-wrap: wrap;
  // justify-content: center;
  @media (max-width: 500px) {
    gap: 40px;
  }
`;

const PaginationBtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 40px 0px;
  gap: 20px;
`;

const PaginationBtn = styled.button`
  background: ${colors.primary};
  height: 40px;
  width: 120px;
  border-radius: 5px;
  border: none;
  color: #fff;
  padding: 6px 4px;
  text-transform: capitalize;
  cursor: pointer;
  &:disabled {
    background: #ccc;
  }
`;

const Btn = styled(PaginationBtn)`
  text-transform: uppercase;
  width: max-content;
  padding: 4px 6px;
  margin: 10px 10px;
  margin-bottom: 30px;
`;

export default ProductsContainer;
