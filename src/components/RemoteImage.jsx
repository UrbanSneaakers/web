import React, { useState } from "react";

export default function RemoteImage({
  src,
  alt = "",
  width,
  height,
  className,
  style,
  fallback = null,
  loadingFallback = null,
  onClick,
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  if (!src || failed) return fallback;

  return (
    <div style={{ width, height: height ?? "auto", position: "relative", display: "inline-block" }}>
      {!loaded && loadingFallback ? (
        <div style={{ position: "absolute", inset: 0 }}>{loadingFallback}</div>
      ) : null}

      <img
        src={src}
        alt={alt}
        className={className}
        onClick={onClick}
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        style={{
          width: "100%",
          height: height ? "100%" : "auto",
          display: "block",
          objectFit: "contain",
          opacity: loaded ? 1 : 0,
          cursor: onClick ? "pointer" : undefined,
          ...style,
        }}
      />
    </div>
  );
}
