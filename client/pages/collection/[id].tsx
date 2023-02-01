import { useRouter } from "next/router";

const Detail = () => {
  const router = useRouter();
  const id = Number(router.query.id);

  return <div>{id}페이지입니다.</div>;
};

export default Detail;
