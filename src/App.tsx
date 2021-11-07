import React from "react";
import "./App.css";
import { useForm } from "react-hook-form";
import Dropzone from "./Dropzone";

type FormType = {
  file: FileList;
  sameChordPass: boolean;
  start: number;
  end: number;
};

const getExt = (filename: string) => {
  const pos = filename.lastIndexOf(".");
  if (pos === -1) return "";
  return filename.slice(pos + 1);
};

const style = {
  width: 200,
  height: 150,
  border: "1px dotted #888",
};

function App() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormType>();
  const onSubmit = handleSubmit((data) => console.log(data.file));

  return (
    <>
      <h1>コード解析</h1>
      <form method="post" encType="multipart/form-data" onSubmit={onSubmit}>
        <Dropzone />
        {errors.file && "ファイルはmusicxml形式でアップロードしてください"}
        <br />
        前と同じコードを飛ばす <input type="checkbox" name="sameChordPass" />
        <br />
        <input type="submit" value="Upload" />
      </form>
    </>
  );
}

export default App;
