import Link from "next/link";
import Image from "next/image";

export default function NFT(props: any) {
  return (
    <Link href="/collection/detail">
      <div className="collection__col1">
        <Image alt="NFT" src={props.imgUrl} width={70} height={70} />
      </div>
    </Link>
  );
}
