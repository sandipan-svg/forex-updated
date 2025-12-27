-- AlterTable
ALTER TABLE "user_profile" ADD COLUMN     "phoneCode" TEXT DEFAULT '+91',
ALTER COLUMN "phone" DROP NOT NULL;
