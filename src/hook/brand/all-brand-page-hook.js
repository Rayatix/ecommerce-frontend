// Hooks
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllBrand, getAllBrandPage } from "../../redux/actions/brandAction";

const AllBrandPageHook = () => {
  const dispatch = useDispatch();

  // When First Load The Page It Will Call The API To Get All Brand
  useEffect(() => {
    dispatch(getAllBrand(3));
  }, []);

  // To Get Sate From Redux
  const brand = useSelector((state) => state.allBrand.brand);
  const loading = useSelector((state) => state.allBrand.loading);

  //   console.log(brand);

  //  Make It Work After Page Loading To Avoide The Undefined Error Because Of Delay Of Network (important)
  let pageCount = 0;
  if (brand.paginationResult) pageCount = brand.paginationResult.numberOfPages;

  // To Make Pagination Work And Get The Page Number
  const getPage = (page) => {
    dispatch(getAllBrandPage(page));
    // console.log(page);
  };
  return [brand, loading, pageCount, getPage];
};

export default AllBrandPageHook;
