import storeSBT from "@/public/images/image3.png";
import Image from "next/image";

export default function Boom() {
  return (
    <div className="boom-sbt">
      <Image className="flip" src={storeSBT}></Image>
    </div>
  );
}
