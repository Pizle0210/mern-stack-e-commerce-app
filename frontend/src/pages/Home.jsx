import { Container } from 'react-bootstrap';
import ProductItems from "../components/ProductItems";
import Titles from '../components/Titles';

export const Home = () => {
  return (
      <Container className="py-5 min-h-screen">
        <Titles/>
        <h1 className="font-semibold text-3xl text-black mb-5">
          Welcome to Kampala
        </h1>
        <ProductItems />
      </Container>
  );
};
