// Hooks
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategory } from "../../redux/actions/categoryAction";

const HomeCategoryHook = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategory());
  }, []);

  // Get Last Category State From Redux
  const category = useSelector((state) => state.allCategory.category);

  // Get Last Loading State From Redux
  const loading = useSelector((state) => state.allCategory.loading);

  const colors = [
    "#FFD3E8",
    "#F4DBA5",
    "#55CFDF",
    "#0034FF",
    "#FFD3E8",
    "#0034F1",
  ];

  return [category, loading, colors];
};

export default HomeCategoryHook;
