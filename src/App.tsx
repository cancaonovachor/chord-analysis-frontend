import React from "react";
import "./App.css";
import { useForm } from "react-hook-form";

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
        <input
          type="file"
          {...register("file", {
            validate: (file) => {
              return getExt(file[0].name) === "musicxml";
            },
          })}
        />
        {errors.file && "ファイルはmusicxml形式でアップロードしてください"}
        <br />
        前と同じコードを飛ばす <input type="checkbox" name="sameChordPass" />
        <br />
        開始小節
        <input type="number" {...register("start")} />
        <br />
        終了小節 <input type="number" {...register("end")} />
        <br />
        <input type="submit" value="Upload" />
      </form>
    </>
  );
}

export default App;
