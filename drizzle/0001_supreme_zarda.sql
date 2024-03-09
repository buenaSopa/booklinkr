CREATE TABLE IF NOT EXISTS "book" (
	"work_key" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"author" text,
	"cover_url" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "book_bookshelf" (
	"book_id" text NOT NULL,
	"bookself_id" text NOT NULL,
	CONSTRAINT "book_bookshelf_bookself_id_book_id_pk" PRIMARY KEY("bookself_id","book_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bookshelf" (
	"id" text PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"code" serial NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "book_bookshelf" ADD CONSTRAINT "book_bookshelf_book_id_book_work_key_fk" FOREIGN KEY ("book_id") REFERENCES "book"("work_key") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "book_bookshelf" ADD CONSTRAINT "book_bookshelf_bookself_id_bookshelf_id_fk" FOREIGN KEY ("bookself_id") REFERENCES "bookshelf"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bookshelf" ADD CONSTRAINT "bookshelf_id_user_id_fk" FOREIGN KEY ("id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
