import React, { HTMLProps, useState } from "react";

type ImgProps = HTMLProps<HTMLImageElement> & {
  fallback?: React.ReactNode;
};

export function Img(props: ImgProps) {
  const { fallback = null } = props;
  const [isBroken, setIsBroken] = useState(false);

  function handleError() {
    setIsBroken(true);
  }

  if (isBroken) {
    return fallback;
  }

  return <img onError={handleError} {...props} />;
}
