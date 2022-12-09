-- CreateTable
CREATE TABLE "UserMeta" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "whatsNumber" TEXT NOT NULL,
    "companyName" TEXT,
    "websiteLink" TEXT,
    "ws_webSiteName" TEXT,
    "ws_appCategory" TEXT,
    "mb_search" TEXT,
    "mb_social" TEXT,
    "mb_native" TEXT,
    "mb_display" TEXT,
    "mb_video" TEXT,
    "mb_others" TEXT,
    "sm_facebook" TEXT,
    "sm_twitter" TEXT,
    "sm_instagram" TEXT,
    "sm_tiktok" TEXT,
    "sm_snapchat" TEXT,
    "sm_pinterest" TEXT,
    "sm_youtube" TEXT,
    "sm_linkedin" TEXT,
    "sm_whatsapp" TEXT,
    "sm_telegram" TEXT,
    "privilege" VARCHAR(10) NOT NULL DEFAULT 'publisher',
    "last_login" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserMeta_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserMeta_userId_key" ON "UserMeta"("userId");

-- AddForeignKey
ALTER TABLE "UserMeta" ADD CONSTRAINT "UserMeta_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
