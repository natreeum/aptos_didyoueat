import AdminFooter from "@/src/components/AdminFooter";
import AdminHeader from "@/src/components/AdminHeader";
import AdminLayout from "@/src/components/AdminLayout";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import storImg from "@/public/images/image3.png";

const StoreDetail = () => {
  const router = useRouter();
  const id = Number(router.query.id);
  const [toggleImageQr, setToggleImageQr] = useState(false);
  const [toggleDetail, setToggleDetail] = useState(false);

  return (
    <AdminLayout setLoginToggle={undefined}>
      <div className="store-detail">
        <div className="store-detail__heading">
          <h2>Store Detail</h2>
        </div>
        <div className="store-detail__container">
          <div className="store-detail__title">
            <h1>Miller Draft 서초 2점</h1>
            <p>
              Miller Draft 서초 2점의 Store NFT 정보입니다.
              <br />
              {/* Store NFT를 가지고 계십니까?{" "} */}
              <Link href="/admin/store">
                <span> 다른 매장 보러가기 ↘</span>
              </Link>
            </p>
          </div>
          <div
            onClick={() => {
              setToggleImageQr(!toggleImageQr);
            }}
            className={toggleImageQr ? "store-detail__image-qr bigger" : "store-detail__image-qr"}>
            <Image src={storImg} alt="miler" width={250} height={250}></Image>
            {/* <Image className="qrexample" src="/images/didyoueatqr.png" alt="qrexample" width={230} height={230}></Image> */}
            <QRCodeSVG
              value={"http://172.16.72.235:3000/qr/" + id}
              size={230}
              bgColor={"#000000"}
              fgColor={"#daff5b"}
              level={"L"}
              includeMargin={false}
              // imageSettings={{
              //   src: "https://static.zpao.com/favicon.png",
              //   x: undefined,
              //   y: undefined,
              //   height: 24,
              //   width: 24,
              //   excavate: true,
              // }}
            />
          </div>
          <div className="store-detail__description">
            <p>가게이름: Miler Draft</p>
            <p>생성일자: 2021년 12월 25일</p>
            <p>가게장소: 서울시 서초구 서초대로 72길 178-12</p>
          </div>
          <div className="store-detail__description__detail">
            <h2
              onClick={() => {
                setToggleDetail(!toggleDetail);
              }}>
              매장정보 더보기
              <div className={toggleDetail ? "plus-button rotate-x" : "plus-button"}></div>
            </h2>
            <p className={toggleDetail ? "show " : "hide"}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta harum rerum cum suscipit doloribus
              repudiandae voluptate magnam, quod dolores blanditiis ad voluptatem velit sed accusantium culpa, quibusdam
              voluptates alias maiores animi, illum impedit veritatis eveniet amet recusandae! Expedita, harum itaque
              nobis numquam optio unde sint, quos a recusandae alias maxime quia atque repellat rerum laborum quis ipsum
              doloremque aliquid velit? Praesentium voluptas perferendis nisi vero. Corporis excepturi asperiores odio!
              Eum possimus magni id tempore iusto temporibus facilis magnam! Explicabo culpa nemo modi, fugiat labore
              minima sequi, ipsum, eum aspernatur rerum sit fuga? Nihil id, ullam aspernatur tempore optio reiciendis
              unde porro aliquid, sequi earum minima fuga tenetur dolores voluptate sint maiores adipisci voluptates
              quibusdam odit! Accusantium possimus deleniti consectetur qui, voluptatem eligendi explicabo. Doloribus,
              illum voluptatibus, in aperiam hic repellat vitae, exercitationem vero iusto ex odit temporibus quaerat
              itaque libero accusantium. Sit quo tenetur sint, ducimus esse nihil impedit tempora veritatis itaque
              vitae? Eveniet nesciunt amet corporis possimus ad esse ex consequatur architecto! Ullam sequi laboriosam
              minus aliquam accusamus saepe ipsam blanditiis molestias maiores. Eveniet odit amet modi aperiam cum nulla
              quibusdam explicabo, adipisci nam ex fuga, sint soluta accusantium ad porro. Aut asperiores sequi quisquam
              eum doloremque cupiditate fugit quaerat numquam quas cumque laudantium, architecto, dolor culpa? Aperiam
              vitae magni earum aut, quia repellat dolorum, soluta labore voluptas recusandae at est cum omnis iure
              tenetur hic sapiente harum tempore excepturi assumenda impedit pariatur et. Exercitationem porro nisi
              optio iste ipsa obcaecati nulla esse, doloremque laborum veniam perferendis accusantium tempore incidunt,
              temporibus labore voluptatem ea dolores molestiae soluta, officiis facilis molestias quas cum! Pariatur
              consequuntur dolor atque. Nisi consectetur, qui incidunt, maxime, at voluptatem quod tempore totam labore
              doloremque quae odit facere fugiat. Quo id, ipsam unde hic sit illo iusto doloribus fugit, fugiat
              reiciendis corporis nihil quisquam molestias ex?
            </p>
          </div>
          <div className="store-detail__description__link">
            <Link href="/admin/store/1/stat">
              <div className="classic-button yellow-color">매장통계 보러가기</div>
            </Link>
            <Link href="/admin/store/1/edit">
              <div className="classic-button white-color">매장정보 수정하기</div>
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default StoreDetail;
