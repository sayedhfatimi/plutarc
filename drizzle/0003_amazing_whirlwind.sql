ALTER TABLE "apiKeys" RENAME TO "APIKey";--> statement-breakpoint
ALTER TABLE "APIKey" DROP CONSTRAINT "apiKeys_userId_user_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "APIKey" ADD CONSTRAINT "APIKey_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
