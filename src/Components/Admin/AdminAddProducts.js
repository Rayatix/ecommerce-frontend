import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Multiselect from "multiselect-react-dropdown";
import add from "../../images/add.png";
import MultiImageInput from "react-multiple-image-input";

import { useSelector, useDispatch } from "react-redux";
import { getAllCategory } from "../../redux/actions/categoryAction";
import { getAllBrand } from "../../redux/actions/brandAction";

// import { SketchPicker } from "react-color";
import { CompactPicker } from "react-color";

// For Notification Information
import notify from "../../hook/useNotification";

const AdminAddProducts = () => {
  // Redux
  const dispatch = useDispatch();
  useEffect(() => {
    if (!navigator.onLine) {
      notify("من فضلك تأكد من الاتصال بالانترنت", "warning");
      return;
    }
    dispatch(getAllCategory());
    dispatch(getAllBrand());
  }, []);

  // Get Last Category State From Redux
  const category = useSelector((state) => state.allCategory.category);
  //   if (category) console.log(category.data);

  // Get Last Category State From Redux
  const brand = useSelector((state) => state.allBrand.brand);

  const onSelect = () => {};
  const onRemove = () => {};

  const options = [
    { name: "التصنيف الاول", id: 1 },
    { name: "التصنيف الثاني", id: 2 },
  ];

  // Values Image Product
  const [images, setImages] = useState([]);
  // console.log(images);

  // Values State
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [priceBefore, setPriceBefore] = useState("السعر قبل الخصم");
  const [priceAfter, setPriceAfter] = useState("السعر بعد الخصم");
  const [qty, setQty] = useState("الكمية المتاحة");
  const [CatID, setCatID] = useState("");
  const [BrandID, setBrandID] = useState("");
  const [subCatID, setSubCatID] = useState([]);
  const [seletedSubID, setSeletedSubID] = useState([]);

  // To Show And Hide The Color Picker
  const [showColor, setShowColor] = useState(false);
  // To Store All Pick Color
  const [colors, setColors] = useState([]);
  // When Choose New Color
  const handleChangeComplete = (color) => {
    setColors([...colors, color.hex]);
    setShowColor(!showColor);
  };
  //   console.log(colors);

  //   Remove Color
  const removeColor = (color) => {
    const newColor = colors.filter((e) => e !== color);
    setColors(newColor);
  };

  // When Select Category Store ID
  const onSelectCategory = (e) => {
    setCatID(e.target.value);
  };
  //   console.log(CatID);

  // When Select Brand Store ID
  const onSelectBrand = (e) => {
    setBrandID(e.target.value);
  };
  console.log(BrandID);

  return (
    <div>
      <Row className="justify-content-start ">
        <div className="admin-content-text pb-4"> اضافه منتج جديد</div>
        <Col sm="8">
          <div className="text-form pb-2"> صور للمنتج</div>

          <MultiImageInput
            images={images}
            setImages={setImages}
            theme={"light"}
            allowCrop={false}
            max={5}
          />

          <input
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            type="text"
            className="input-form d-block mt-3 px-3"
            placeholder="اسم المنتج"
          />

          <textarea
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            className="input-form-area p-2 mt-3"
            rows="4"
            cols="50"
            placeholder="وصف المنتج"
          />

          <input
            value={priceBefore}
            onChange={(e) => setPriceBefore(e.target.value)}
            type="number"
            className="input-form d-block mt-3 px-3"
            placeholder="السعر قبل الخصم"
          />

          <input
            value={priceAfter}
            onChange={(e) => setPriceAfter(e.target.value)}
            type="number"
            className="input-form d-block mt-3 px-3"
            placeholder="سعر المنتج بعد الخصم"
          />

          <input
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            type="number"
            className="input-form d-block mt-3 px-3"
            placeholder="الكمية المتاحة"
          />

          <select
            name="cat"
            value={CatID}
            onChange={onSelectCategory}
            className="select input-form-area mt-3 px-2 "
          >
            <option value="0">التصنيف الرئيسي</option>

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

          <Multiselect
            className="mt-2 text-end"
            placeholder="التصنيف الفرعي"
            options={options}
            onSelect={onSelect}
            onRemove={onRemove}
            displayValue="name"
            style={{ color: "red" }}
          />

          <select
            value={BrandID}
            onChange={onSelectBrand}
            name="brand"
            id="brand"
            className="select input-form-area mt-3 px-2 "
          >
            <option value="val">اختر ماركة</option>
            {brand.data
              ? brand.data.map((item) => {
                  return (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  );
                })
              : null}
          </select>

          <div className="text-form mt-3 "> الالوان المتاحه للمنتج</div>

          <div className="mt-1 d-flex">
            {colors.length >= 1
              ? colors.map((color, index) => {
                  return (
                    <div
                      onClick={() => removeColor(color)}
                      key={index}
                      className="color ms-2 border mt-1"
                      style={{ backgroundColor: color }}
                    ></div>
                  );
                })
              : null}

            <img
              onClick={() => setShowColor(!showColor)}
              src={add}
              alt=""
              width="30px"
              height="35px"
              className=""
              style={{ cursor: "pointer" }}
            />

            {showColor === true ? (
              <CompactPicker onChangeComplete={handleChangeComplete} />
            ) : null}
          </div>
        </Col>
      </Row>
      <Row>
        <Col sm="8" className="d-flex justify-content-end ">
          <button className="btn-save d-inline mt-2 ">حفظ التعديلات</button>
        </Col>
      </Row>
    </div>
  );
};

export default AdminAddProducts;
