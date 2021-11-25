import "./App.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Button, Checkbox, Container, Stack } from "@mui/material";
import { saveAs } from "file-saver";

type FormType = {
  file: FileList;
  sameChordPass: boolean;
  start: number;
  end: number;
};

// const getExt = (filename: string) => {
//   const pos = filename.lastIndexOf(".");
//   if (pos === -1) return "";
//   return filename.slice(pos + 1);
// };

function App() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormType>();

  const onSubmit = handleSubmit(async (data) => {
    console.log("submit", data);
    const d = new FormData();
    d.append("file", data.file[0], data.file[0].name);
    d.append("sameChordPass", data.sameChordPass ? "true" : "false");
    await axios
      .post(
        "https://chord-analysis-backend-iq5232hggq-uc.a.run.app/upload",
        // "localhost:8080/upload",
        d,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      )
      .then((response) => {
        const blob = new Blob([response.data], {
          type: response.data.type,
        });
        saveAs(blob, "result_" + data.file[0].name);
      });
  });

  return (
    <>
      <Container maxWidth="sm" sx={{ pt: 5 }}>
        <h1 style={{ textAlign: "center" }}>コード解析</h1>
        <Stack spacing={3}>
          <form method="post" encType="multipart/form-data" onSubmit={onSubmit}>
            {errors.file && "ファイルはmusicxml形式でアップロードしてください"}
            <div>
              <input
                type="file"
                {...register("file", { required: true })}
                name="file"
                id="fileid"
                accept="*"
                style={{ opacity: 0, appearance: "none", position: "absolute" }}
              />
              <label htmlFor="fileid">
                <Button
                  color="success"
                  variant="contained"
                  size="large"
                  component="span"
                >
                  + クリックしてファイルを追加
                </Button>
              </label>
            </div>
            <div>
              <label htmlFor="sameChordPassid">
                <Checkbox id="sameChordPassid" {...register("sameChordPass")} />{" "}
                前と同じコードを飛ばす
              </label>
            </div>

            <div>
              <input type="submit" style={{ display: "none" }} />
              <label htmlFor="submitBtnid">
                <Button color="primary" variant="contained" size="large">
                  作成
                </Button>
              </label>
            </div>
          </form>
        </Stack>
      </Container>
    </>
  );
}

export default App;
