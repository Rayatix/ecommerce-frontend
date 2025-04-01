import React, { useEffect, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import avatar from "../../images/avatar.png";
import { useSelector, useDispatch } from "react-redux";
import { createCategory } from "../../redux/actions/categoryAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminAddCategory = () => {
  const dispatch = useDispatch();
  const [img, setImg] = useState(avatar);
  const [name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPress, setIsPress] = useState(false);

  // To Get Loading State From Redux
  // const loading = useSelector((state) => state.allCategory.loading);

  // When Image Change Save It
  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImg(URL.createObjectURL(e.target.files[0]));
      selectedFile(setSelectedFile(e.target.files[0]));
    }
  };

  const res = useSelector((state) => state.allCategory.category);

  // Save Data In Database
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name === "" || selectedFile === null) {
      notify("من فضلك اكمل البيانات", "warning");
      return;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", selectedFile);
    // if (loading) {
    //   console.log("جاري التحميل");
    // }
    setLoading(true);
    setIsPress(true);
    await dispatch(createCategory(formData));
    setLoading(false);
  };

  useEffect(() => {
    if (!loading) {
      setImg(avatar);
      setName("");
      setSelectedFile(null);
      console.log("تم الانتهاء");
      setLoading(true);
      setTimeout(() => setIsPress(false), 5000);
      if (res.status === 201) {
        notify("تمت الاضافه بنجاح", "success");
      } else {
        notify("هناك مشكلة في عملية الاضافة", "error");
      }
    }
  }, [loading]);

  const notify = (message, type) => {
    if (type === "success") {
      toast.success(message);
    } else if (type === "warning") {
      toast.warning(message);
    } else if (type === "error") {
      toast.error(message);
    } else {
      toast(message);
    }
  };

  return (
    <div>
      <Row className="justify-content-start ">
        <div className="admin-content-text pb-4">اضافه تصنيف جديد</div>
        <Col sm="8">
          <div className="text-form pb-2">صوره التصنيف</div>

          <div>
            <label for="upload-photo">
              <img
                src={img}
                alt="fzx"
                height="100px"
                width="120px"
                style={{ cursor: "pointer" }}
              />
            </label>

            <input
              type="file"
              name="photo"
              id="upload-photo"
              onChange={onImageChange}
            />
          </div>

          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            className="input-form d-block mt-3 px-3"
            placeholder="اسم التصنيف"
          />
        </Col>
      </Row>

      <Row>
        <Col sm="8" className="d-flex justify-content-end ">
          <button onClick={handleSubmit} className="btn-save d-inline mt-2 ">
            حفظ التعديلات
          </button>
        </Col>
      </Row>

      {isPress ? (
        loading ? (
          <Spinner animation="border" variant="primary" />
        ) : (
          <h4>تم الانتهاء</h4>
        )
      ) : null}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default AdminAddCategory;
