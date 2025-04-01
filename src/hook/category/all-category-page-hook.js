// Hooks
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllCategory,
  getAllCategoryPage,
} from "../../redux/actions/categoryAction";

const AllCategoryPageHook = () => {
  const dispatch = useDispatch();

  // When First Load The Page It Will Call The API To Get All Category
  useEffect(() => {
    dispatch(getAllCategory(8));
  }, []);

  // To Get Sate From Redux
  const category = useSelector((state) => state.allCategory.category);
  const loading = useSelector((state) => state.allCategory.loading);

  //  Make It Work After Page Loading To Avoide The Undefined Error Because Of Delay Of Network (important)
  let pageCount = 0;
  if (category.paginationResult)
    pageCount = category.paginationResult.numberOfPages;

  // To Make Pagination Work And Get The Page Number
  const getPage = (page) => {
    dispatch(getAllCategoryPage(page));
    // console.log(page);
  };
  return [category, loading, pageCount, getPage];
};

export default AllCategoryPageHook;
