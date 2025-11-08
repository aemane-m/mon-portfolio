import { ImageResponse } from "next/og";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div style={{
        width:"100%",height:"100%",display:"flex",
        alignItems:"center",justifyContent:"center",
        fontSize:64,fontWeight:700
      }}>
        dpmaine.fr — Portfolio
      </div>
    ),
    size
  );
}
