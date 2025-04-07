import React from "react";
import BrandCard from "./BrandCard";
import { Container, Row, Spinner } from "react-bootstrap";

const BrandContainer = ({ data, loading }) => {
  return (
    <Container>
      <div className="admin-content-text mt-2 ">كل الماركات</div>
      <Row className="my-1 d-flex justify-content-between">
        {/* <BrandCard img={brand1} /> */}

        {loading === false ? (
          data ? (
            data.slice(0, 5).map((item, index) => {
              return <BrandCard key={index} img={item.image} />;
            })
          ) : (
            <h4>لا يوجد تصنيفات</h4>
          )
        ) : (
          <Spinner animation="border" variant="primary" />
        )}
      </Row>
    </Container>
  );
};

export default BrandContainer;
