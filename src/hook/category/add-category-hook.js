import React, { useEffect, useState } from "react";
import notify from "../../hook/useNotification";
import { useSelector, useDispatch } from "react-redux";
import { createCategory } from "../../redux/actions/categoryAction";
import avatar from "../../images/avatar.png";

const AddCategoryHook = () => {
  const dispatch = useDispatch();
  const [img, setImg] = useState(avatar);
  const [name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPress, setIsPress] = useState(false);

  // To Change Name State
  const onChangeName = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

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

  return [
    img,
    name,
    loading,
    isPress,
    handleSubmit,
    onImageChange,
    onChangeName,
  ];
};

export default AddCategoryHook;
