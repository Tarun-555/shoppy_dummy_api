import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { product } from './ProductsContainer';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import loader from '../assets/icons/load.gif';
import Rating from '../components/Rating';
import { Price } from '../components/Card';

const ProductDetailContainer = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<product | null>(null);

  useEffect(() => {
    axios.get(`https://dummyjson.com/products/${id}`).then((data) => {
      console.log('po', data);
      setProduct(data.data);
    });
  }, [id]);

  return (
    <DetailContainer>
      {product ? (
        <DetailsWrapper>
          <ImageContainer>
            <Carousel thumbWidth={60} dynamicHeight={false}>
              {product.images.map((image: string) => {
                return <img src={image} />;
              })}
            </Carousel>
          </ImageContainer>
          <Details>
            <h1 style={{ fontFamily: 'Roboto', marginBottom: '5px' }}>
              {product.title.replace('-', ' ')}
            </h1>
            <RatingWrapper>
              Rating:
              <Rating count={product?.rating} />
            </RatingWrapper>
            <PriceWrapper>
              <span>&#8377;</span>
              <h2>{product.price?.toFixed(2)}</h2>
              <Discount>
                {'( '}Discount: {product.discountPercentage}% {')'}
              </Discount>
            </PriceWrapper>
            <BrandContainer>
              <Brand>{product.brand}</Brand>
              <Category>{product.category.replace('-', ' ')}</Category>
            </BrandContainer>
            <Description>{product.description}</Description>

            <BtnWrapper>
              <Btn color={'#faa307'}>Buy Now</Btn>
              <Btn color={'#e85d04'}>Add to Cart</Btn>
            </BtnWrapper>
          </Details>
        </DetailsWrapper>
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img src={loader} />
        </div>
      )}
    </DetailContainer>
  );
};

const DetailContainer = styled.div`
  padding-top: 80px;
`;

const DetailsWrapper = styled.div`
  display: flex;
  background: #fff;
  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

const ImageContainer = styled.div`
  margin: 20px;
  height: 500px;
  width: 50%;
  display: flex;
  @media (max-width: 500px) {
    width: 100%;
    margin: 0px;
  }
  .carousel-root {
    outline: none;
    @media (max-width: 500px) {
      width: inherit;
    }
  }
  .carousel-status {
    display: none;
  }
  .carousel .slide img {
    height: 380px;
    object-fit: contain;
  }
  .carousel .thumb img {
    height: 80px;
    object-fit: cover;
  }
`;

const Details = styled.div`
  width: 50%;
  padding: 10px 20px;
  margin: auto;
  box-sizing: border-box;
  @media (max-width: 500px) {
    margin: 0;
    width: 100%;
  }
`;

const RatingWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const PriceWrapper = styled(Price)`
  font-size: 35px;
  margin: 20px -5px;
`;

const Discount = styled.span`
  font-size: 20px;
  margin: 10px;
  color: red;
  font-weight: bold;
  font-family: serif;
`;

const BrandContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const Brand = styled.div`
  background: #ff595e;
  color: #fff;
  padding: 5px 18px;
  border-radius: 18px;
  font-family: 'Roboto';
  letter-spacing: 0.3px;
  text-transform: capitalize;
  font-size: 14px;
`;

const Category = styled.div`
  background: #34a0a4;
  color: #fff;
  padding: 5px 18px;
  border-radius: 18px;
  font-family: 'Roboto';
  letter-spacing: 0.3px;
  text-transform: capitalize;
  font-size: 14px;
`;

const Description = styled.div`
  margin: 25px 0px;
  line-height: 22px;
  font-size: 18px;
  font-family: monospace;
`;

const BtnWrapper = styled.div`
  display: flex;
  gap: 20px;
  margin: 30px 0px;
`;

const Btn = styled.button`
  background: ${(props) => props.color};
  padding: 15px 30px;
  border-radius: 5px;
  outline: none;
  border: none;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  @media (max-width: 500px) {
    width: 50%;
    padding: 15px;
  }
  &:hover {
    box-shadow: 2px 2px 4px 0px #000;
  }
`;

export default ProductDetailContainer;
