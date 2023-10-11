import React from "react";
import { Col, Container, Row } from "react-bootstrap";

export default function FormContainer({ children }) {
  return (
    <Container className="flex justify-center sm:place-content-center h-[100dvh] sm:items-center">
      <Row className="">
        <Col className="w-[300px] sm:w-[450px] md:w-[500px]">{children}</Col>
      </Row>
    </Container>
  );
}
