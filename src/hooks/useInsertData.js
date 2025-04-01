import baseUrl from "../Api/baseUrl";

const useInsertDataWithImage = async (url, parmas) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  const res = await baseUrl.post(url, parmas, config);
  return res.data;
};

const useInsertData = async (url, parmas) => {
  const res = await baseUrl.post(url, parmas);
  return res.data;
};

export { useInsertData, useInsertDataWithImage };
