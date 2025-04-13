import { Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Redux Actions (For Dispatch)
import { getAllCategory } from "../../redux/actions/categoryAction";
import { createSubCategory } from "../../redux/actions/subcategoryAction";

// For Notification Information
import { ToastContainer } from "react-toastify";
import notify from "../../hook/useNotification";

const AdminAddSubCategory = () => {
  const dispatch = useDispatch();

  useEffect(() => {
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

  // On Save Data
  const handleSubmit = async (e) => {
    e.preventDefault();
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

  return (
    <div>
      <Row className="justify-content-start ">
        <div className="admin-content-text pb-4">اضافه تصنيف فرعي جديد</div>
        <Col sm="8">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="input-form d-block mt-3 px-3"
            placeholder="اسم التصنيف الفرعي"
          />

          <select
            name="category"
            id="cat"
            className="select mt-3 px-2"
            onChange={handleChange}
          >
            <option value="0">اختر تصنيف رئيسي</option>
            {category.data
              ? category.data.map((item) => {
                  return (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  );
                })
              : null}
          </select>
        </Col>
      </Row>

      <Row>
        <Col sm="8" className="d-flex justify-content-end ">
          <button onClick={handleSubmit} className="btn-save d-inline mt-2 ">
            حفظ التعديلات
          </button>
        </Col>
      </Row>

      <ToastContainer />
    </div>
  );
};

export default AdminAddSubCategory;
