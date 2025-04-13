import { Row, Col } from "react-bootstrap";
// import { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";

// Redux Actions (For Dispatch)
// import { getAllCategory } from "../../redux/actions/categoryAction";
// import { createSubCategory } from "../../redux/actions/subcategoryAction";

// For Notification Information
import { ToastContainer } from "react-toastify";

import AddSubcategoryHook from "../../hook/subcategory/add-subcategory-hook";
// import notify from "../../hook/useNotification";

const AdminAddSubCategory = () => {
  const [
    id,
    name,
    loading,
    category,
    subcategory,
    handleChange,
    handleSubmit,
    onChangeName,
  ] = AddSubcategoryHook();

  return (
    <div>
      <Row className="justify-content-start ">
        <div className="admin-content-text pb-4">اضافه تصنيف فرعي جديد</div>
        <Col sm="8">
          <input
            value={name}
            onChange={onChangeName}
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
