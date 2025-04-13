import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Redux Actions (For Dispatch)
import { getAllCategory } from "../../redux/actions/categoryAction";
import { createSubCategory } from "../../redux/actions/subcategoryAction";

// For Notification Information
import notify from "../../hook/useNotification";

const AddSubcategoryHook = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!navigator.onLine) {
      notify("من فضلك تأكد من الاتصال بالانترنت", "warning");
      return;
    }
    dispatch(getAllCategory());
  }, []);

  // Get Last Category State From Redux
  const category = useSelector((state) => state.allCategory.category);
  //   if (category) console.log(category.data);

  // Get Sub Category State From Redux (First Value After State Comes From rootReducer And Second Value Is The Name Of The Reducer From subcategoryReducer)
  const subcategory = useSelector((state) => state.subCategory.subcategory);
  //   if (subcategory) console.log(subcategory);

  // On Change Dropdown Menu
  const handleChange = (e) => {
    setId(e.target.value);
  };

  // To Save Name
  const onChangeName = (e) => {
    e.persist();
    setName(e.target.value);
  };

  // On Save Data
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!navigator.onLine) {
      notify("من فضلك تأكد من الاتصال بالانترنت", "warning");
      return;
    }

    if (id === "0") {
      notify("من فضلك اختر تصنيف رئيسي", "warning");
      return;
    }

    if (name === "") {
      notify("من فضلك ادخل اسم التصنيف", "warning");
      return;
    }
    setLoading(true);
    await dispatch(
      createSubCategory({
        name: name,
        category: id,
      })
    );
    setLoading(false);
  };

  const [id, setId] = useState("0");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loading) {
      setName("");
      setId("0");
      //   if (subcategory) {
      //     console.log(subcategory);
      //   }
      if (subcategory.status === 201) {
        notify("تمت الاضافة بنجاح", "success");
      } else if (
        subcategory === "ErrorAxiosError: Request failed with status code 400"
      ) {
        notify("هذا الأسم مكرر من فضلك اختر اسم اخر", "warning");
      } else {
        notify("هناك مشكلة في عملية الأضافة", "warning");
      }
      setLoading(true);
    }
  }, [loading]);

  return [
    id,
    name,
    loading,
    category,
    subcategory,
    handleChange,
    handleSubmit,
    onChangeName,
  ];
};

export default AddSubcategoryHook;
