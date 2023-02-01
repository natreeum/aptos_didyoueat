-- CreateTable
CREATE TABLE "Token" (
    "token_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "comment" TEXT,
    "user_wallet_address" TEXT NOT NULL,
    "collection_id" INTEGER NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("token_id")
);

-- CreateTable
CREATE TABLE "User" (
    "wallet_address" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("wallet_address")
);

-- CreateTable
CREATE TABLE "Owner" (
    "owner_id" TEXT NOT NULL,
    "owner_pw" TEXT NOT NULL,

    CONSTRAINT "Owner_pkey" PRIMARY KEY ("owner_id")
);

-- CreateTable
CREATE TABLE "Collection" (
    "collection_id" SERIAL NOT NULL,
    "img_url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "coordinate_x" INTEGER NOT NULL,
    "coordinate_y" INTEGER NOT NULL,
    "minted" INTEGER NOT NULL DEFAULT 0,
    "shop_name" TEXT NOT NULL,
    "owner_id" TEXT NOT NULL,

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("collection_id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "collection_id" INTEGER NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_user_wallet_address_fkey" FOREIGN KEY ("user_wallet_address") REFERENCES "User"("wallet_address") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "Collection"("collection_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "Owner"("owner_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "Collection"("collection_id") ON DELETE RESTRICT ON UPDATE CASCADE;
