-- CreateTable
CREATE TABLE "Todo" (
    "id" SERIAL NOT NULL,
    "label" TEXT,
    "isComplete" BOOLEAN,
    "assignedTo" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "password" TEXT,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Todo.assignedTo_index" ON "Todo"("assignedTo");

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Todo" ADD FOREIGN KEY ("assignedTo") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
