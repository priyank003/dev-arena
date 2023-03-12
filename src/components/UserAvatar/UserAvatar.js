import {
  PlusOutlined,
  LoadingOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { message, Upload, Row } from "antd";
import { useState } from "react";

import classes from "./UserAvatar.module.css";
const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};
const AvatarUpload = ({ getImage }) => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const handleChange = (info) => {
    getBase64(info.file.originFileObj, (url) => {
      setLoading(false);
      setImage(url);
    });
    console.log(info.file.originFileObj);

    setImage(info.file.originFileObj);
    getImage(info.file.originFileObj);
  };

  const deleteHandler = () => {
    setImage(null);
  };
  const uploadButton = (
    <div className={classes["upload__button"]}>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  return (
    <>
      {/* <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="avatar"
            style={{
              width: "100%",
            }}
          />
        ) : (
          uploadButton
        )}
      </Upload> */}
      <Row align="middle" style={{ justifyContent: "center" }}>
        <Upload
          name="avatar"
          listType="picture-circle"
          // className="avatar-uploader"
          beforeUpload={beforeUpload}
          showUploadList={false}
          className={classes["avatar-uploader"]}
          onChange={handleChange}
        >
          {image ? (
            <div className={classes["preview__wrapper"]}>
              <img
                src={image}
                alt="avatar"
                style={{
                  width: "100%",
                }}
              />
              <DeleteOutlined
                className={classes["delete__preview"]}
                onClick={deleteHandler}
              />
            </div>
          ) : (
            uploadButton
          )}
        </Upload>
      </Row>
    </>
  );
};
export default AvatarUpload;
