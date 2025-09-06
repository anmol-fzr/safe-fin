DROP INDEX "session_token_unique";--> statement-breakpoint
DROP INDEX "user_email_unique";--> statement-breakpoint
DROP INDEX "user_phone_number_unique";--> statement-breakpoint
DROP INDEX "tag_name_unique";--> statement-breakpoint
ALTER TABLE `lesson` ALTER COLUMN "created_at" TO "created_at" integer;--> statement-breakpoint
CREATE UNIQUE INDEX `session_token_unique` ON `session` (`token`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_phone_number_unique` ON `user` (`phone_number`);--> statement-breakpoint
CREATE UNIQUE INDEX `tag_name_unique` ON `tag` (`name`);--> statement-breakpoint
ALTER TABLE `lesson` ALTER COLUMN "updated_at" TO "updated_at" integer;