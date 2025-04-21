import React, { useState, useEffect } from "react";
import notify from "../useNotification";
import { useDispatch, useSelector } from "react-redux";
import { createNewUser } from "../../redux/actions/authAction";
import { useNavigate } from "react-router-dom";

const RegisterHook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(true);

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePhone = (e) => {
    setPhone(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const validationValues = () => {
    if (name === "") {
      notify("الرجاء إدخال اسم المستخدم", "error");
      return false;
    }

    if (email === "") {
      notify("الرجاء إدخال البريد الإلكتروني", "error");
      return false;
    }

    if (phone === "") {
      notify("الرجاء إدخال رقم الهاتف", "error");
      return false;
    } else if (phone.length <= 10) {
      notify("من فضلك ادخل رقم هاتف صحيح", "error");
      return false;
    }

    if (password === "") {
      notify("الرجاء إدخال كلمة المرور", "error");
      return false;
    }

    if (confirmPassword === "") {
      notify("الرجاء تأكيد كلمة المرور", "error");
      return false;
    }

    if (password !== confirmPassword) {
      notify("كلمة المرور غير متطابقة", "error");
      return false;
    }
    return true;
  };

  const res = useSelector((state) => state.authReducer.createUser);

  // Save Data
  const onSubmit = async () => {
    validationValues();
    setLoading(true);
    await dispatch(
      createNewUser({
        name: name,
        email: email,
        password: password,
        passwordConfirm: confirmPassword,
        phone: phone,
      })
    );

    setLoading(false);
  };

  useEffect(() => {
    if (loading === false) {
      if (res) {
        // console.log(res);
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
          notify("تم تسجيل الحساب بنجاح", "success");
          //   setName("");
          //   setEmail("");
          //   setPhone("");
          //   setPassword("");
          //   setConfirmPassword("");
          //   setLoading(true);
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
        if (res.data.errors) {
          if (res.data.errors[0].msg === "E-mail already in use") {
            notify("هذا الايميل مسجل من قبل", "error");
          }
        }

        if (res.data.errors) {
          if (res.data.errors[0].msg === "accept only egypt phone numbers") {
            notify("يجب ان يكون الرقم مصري ممكون من 11 رقم", "error");
          }
        }

        if (res.data.errors) {
          if (res.data.errors[0].msg === "must be at least 6 chars") {
            notify("يجب ان لا تقل كلمة السر عن 6 احرف او ارقام", "error");
          }
        }
      }
    }
  }, [loading]);

  return [
    name,
    email,
    phone,
    password,
    confirmPassword,
    loading,
    onChangeName,
    onChangeEmail,
    onChangePhone,
    onChangePassword,
    onConfirmPassword,
    onSubmit,
  ];
};

export default RegisterHook;
