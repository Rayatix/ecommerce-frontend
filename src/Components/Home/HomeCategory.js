import React from "react";
import { Container, Row } from "react-bootstrap";
import SubTiltle from "../Uitily/SubTiltle";
import CategoryCard from "./../Category/CategoryCard";
import clothe from "../../images/clothe.png";
import cat2 from "../../images/cat2.png";
import labtop from "../../images/labtop.png";
import sale from "../../images/sale.png";
import pic from "../../images/pic.png";

// Hooks
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategory } from "../../redux/actions/categoryAction";

const HomeCategory = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategory());
  }, []);

  const category = useSelector((state) => state.allCategory.category);
  const loading = useSelector((state) => state.allCategory.loading);

  console.log(category.data);
  //   console.log(loading);

  return (
    <Container>
      <SubTiltle title="التصنيفات" btntitle="المزيد" pathText="/allcategory" />
      <Row className="my-2 d-flex justify-content-between">
        {category.data ? (
          category.data.map((item) => {
            return (
              <CategoryCard
                title={item.name}
                img={item.image}
                background="#F4DBA4"
              />
            );
          })
        ) : (
          <h4>لا يوجد تصنيفات</h4>
        )}
      </Row>
    </Container>
  );
};

export default HomeCategory;
