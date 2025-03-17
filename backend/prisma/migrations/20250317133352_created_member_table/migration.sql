-- CreateTable
CREATE TABLE "members" (
    "_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "groupName" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "expectedSalary" TEXT NOT NULL,
    "expectedDateOfDefense" TEXT NOT NULL,

    CONSTRAINT "members_pkey" PRIMARY KEY ("_id")
);
