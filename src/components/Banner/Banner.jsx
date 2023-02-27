// Library Imports

import { Col, Image } from "antd";
import { useEffect } from "react";

export default function Banner(props) {
  useEffect(() => {}, [props]);

  return (
    <Col span={24}>
      <Image
        src={props?.Image}
        preview={false}
        width={"-webkit-fill-available"}
      />
    </Col>
  );
}
