import React, { useState, useEffect } from "react";
import notify from "../useNotification";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/actions/authAction";
import { useNavigate } from "react-router-dom";

const LoginHook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Redux state
  const res = useSelector((state) => state.authReducer.loginUser);

  const onChangeEmail = (e) => setEmail(e.target.value);
  const onChangePassword = (e) => setPassword(e.target.value);

  const onSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Validate first
    if (!email) {
      notify("الرجاء إدخال البريد الإلكتروني", "error");
      return;
    }
    if (!password) {
      notify("الرجاء إدخال كلمة المرور", "error");
      return;
    }

    setLoading(true);
    try {
      await dispatch(loginUser({ email, password }));
    } catch (error) {
      notify("فشل تسجيل الدخول", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (res && res.data) {
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        // console.log("Token stored:", res.data.token);
        notify("تمت عملية التسجيل بنجاح", "success");

        setTimeout(() => {
          navigate("/");
        }, 2000);

        // You might want to redirect here
        // window.location.href = '/';
      } else {
        localStorage.removeItem("token");
        notify("البريد الإلكتروني أو كلمة المرور غير صحيحة", "error");
      }

      //   if (res.data.message === "Incorrect email or password") {
      //     console.log(res.status.message);
      //     localStorage.removeItem("token");
      //     notify("البريد الإلكتروني أو كلمة المرور غير صحيحة", "error");
      //   }
    }
  }, [res]); // Only depend on res

  return [email, password, loading, onChangeEmail, onChangePassword, onSubmit];
};

export default LoginHook;
