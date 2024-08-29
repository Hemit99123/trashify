-- CreateTable
CREATE TABLE "Post" (
    "id" BIGSERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "bin" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "lat" DECIMAL(65,30) NOT NULL,
    "long" DECIMAL(65,30) NOT NULL,
    "imagePublicID" TEXT NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Post_city_userId_idx" ON "Post"("city", "userId");
