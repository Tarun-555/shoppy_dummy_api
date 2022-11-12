import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '../constants';
import Rating from './Rating';

interface ICardProps {
  Item: any;
}

const Card = ({ Item }: ICardProps) => {
  console.log('item', Item);
  const navigate = useNavigate();

  const handleProductDetailsView = (id: number) => {
    navigate(`/product/${id}`);
  };
  return (
    <CardContainer>
      <CardImg src={Item.thumbnail && Item.thumbnail} />
      <div>
        <CardTitle>{Item.title}</CardTitle>
      </div>
      <PriceContainer>
        <Price>
          <span>&#8377;</span>
          <h2>{Item.price?.toFixed(2)}</h2>
        </Price>
        <Rating count={parseInt(Item.rating)} />
      </PriceContainer>
      <CardText>{Item.description}</CardText>
      <ViewButton onClick={() => handleProductDetailsView(Item.id)}>
        View Details {'>>'}{' '}
      </ViewButton>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  position: relative;
  height: 375px;
  width: 24%;
  overflow: hidden;
  box-shadow: 0px 0px 1px;
  border-radius: 5px;
  transition: all ease-in 0.2s;
  cursor: pointer;
  background: #fff;
  margin: 0 auto;
  &:hover {
    box-shadow: 0px 1px 5px #7b2cbf;
    transform: scale(1.1);
  }
  @media (max-width: 768px) {
    width: 45%;
  }
  @media (max-width: 500px) {
    width: 80%;
  }
`;

const CardImg = styled.img`
  height: 60%;
  width: 100%;
`;

const CardTitle = styled.h4`
  padding: 4px 12px;
  height: 15%;
  margin: 0;
  font-family: 'Roboto', sans-serif;
`;

const CardText = styled.p`
  padding: 2px 12px;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-family: 'Roboto', sans-serif;
  font-size: 13px;
`;

const PriceContainer = styled.div`
  display: flex;
  margin: 4px 6px;
  gap: 15px;
  align-items: center;
`;
export const Price = styled.div`
  display: flex;
  align-items: flex-end;
  padding-left: 8px;
  > * {
    &:first-child {
      margin-right: 2px;
      margin-bottom: 2px;
    }
    &:nth-child(2) {
      margin: 0px;
      font-family: sans-serif;
    }
  }
`;

const ViewButton = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 10px;
  background: #7b2cbf;
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  margin: 2px 12px;
  text-align: center;
  font-family: 'Roboto';
  font-weight: bold;
  font-size: 12px;
`;

export default Card;
