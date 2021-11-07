import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const style = {
  width: 200,
  height: 150,
  border: "1px dotted #888",
};

export default function Dropzone() {
  const onDrop = useCallback((acceptedFiles) => {
    console.log("acceptedFiles:", acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      accept: ".musicxml",
    });

  return (
    <div {...getRootProps()} style={style}>
      <input type="file" name="file" {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>解析したいファイルをドラッグアンドドロップしてください</p>
      )}
      {isDragReject && <p>musicxmlファイルのみ対応しています</p>}
    </div>
  );
}
