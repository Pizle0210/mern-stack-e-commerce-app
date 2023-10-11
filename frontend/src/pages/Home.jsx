import { Container } from 'react-bootstrap';
import ProductItems from "../components/ProductItems";

export const Home = () => {
  return (
    <main className="py-5 min-h-screen">
      <Container className=''>
        <h1 className="font-semibold text-3xl text-black mb-5">Welcome to Kampala</h1>
        <ProductItems />
      </Container>
    </main>
  );
};
