import baseUrl from "../Api/baseUrl";

const useGetData = async (url, parmas) => {
  const res = await baseUrl.get(url, parmas);
  return res.data;
};

const useGetDataToken = async (url) => {
  console.log(localStorage.getItem("token"));
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  const res = await baseUrl.get(url, config);
  return res.data;
};

export { useGetData, useGetDataToken };
