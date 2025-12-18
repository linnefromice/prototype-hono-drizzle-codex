-- Migration: Add Better Auth tables and rename users to chat_users
-- Created: 2025-12-18

-- Step 1: Create authentication tables

CREATE TABLE `auth_user` (
	`id` text PRIMARY KEY NOT NULL,
	`username` text NOT NULL,
	`email` text,
	`email_verified` integer DEFAULT false NOT NULL,
	`name` text NOT NULL,
	`image` text,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`two_factor_enabled` integer DEFAULT false,
	`display_username` text
);
--> statement-breakpoint

CREATE UNIQUE INDEX `auth_user_username_unique` ON `auth_user` (`username`);
--> statement-breakpoint

CREATE UNIQUE INDEX `auth_user_email_unique` ON `auth_user` (`email`);
--> statement-breakpoint

CREATE INDEX `auth_user_username_idx` ON `auth_user` (`username`);
--> statement-breakpoint

CREATE TABLE `auth_session` (
	`id` text PRIMARY KEY NOT NULL,
	`token` text NOT NULL,
	`expires_at` integer NOT NULL,
	`user_id` text NOT NULL,
	`ip_address` text,
	`user_agent` text,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `auth_user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint

CREATE UNIQUE INDEX `auth_session_token_unique` ON `auth_session` (`token`);
--> statement-breakpoint

CREATE INDEX `auth_session_token_idx` ON `auth_session` (`token`);
--> statement-breakpoint

CREATE INDEX `auth_session_user_id_idx` ON `auth_session` (`user_id`);
--> statement-breakpoint

CREATE TABLE `auth_account` (
	`id` text PRIMARY KEY NOT NULL,
	`account_id` text NOT NULL,
	`provider_id` text NOT NULL,
	`user_id` text NOT NULL,
	`access_token` text,
	`refresh_token` text,
	`id_token` text,
	`access_token_expires_at` integer,
	`refresh_token_expires_at` integer,
	`scope` text,
	`password` text,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `auth_user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint

CREATE INDEX `auth_account_provider_account_idx` ON `auth_account` (`provider_id`, `account_id`);
--> statement-breakpoint

CREATE TABLE `auth_verification` (
	`id` text PRIMARY KEY NOT NULL,
	`identifier` text NOT NULL,
	`value` text NOT NULL,
	`expires_at` integer NOT NULL,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL
);
--> statement-breakpoint

CREATE INDEX `auth_verification_identifier_idx` ON `auth_verification` (`identifier`);
--> statement-breakpoint

-- Step 2: Create new chat_users table with auth_user_id reference

CREATE TABLE `chat_users` (
	`id` text PRIMARY KEY NOT NULL,
	`auth_user_id` text NOT NULL,
	`id_alias` text NOT NULL,
	`avatar_url` text,
	`display_name` text NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`auth_user_id`) REFERENCES `auth_user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint

CREATE UNIQUE INDEX `chat_users_auth_user_id_unique` ON `chat_users` (`auth_user_id`);
--> statement-breakpoint

CREATE UNIQUE INDEX `chat_users_id_alias_unique` ON `chat_users` (`id_alias`);
--> statement-breakpoint

CREATE INDEX `chat_users_id_alias_idx` ON `chat_users` (`id_alias`);
--> statement-breakpoint

CREATE INDEX `chat_users_auth_user_id_idx` ON `chat_users` (`auth_user_id`);
--> statement-breakpoint

-- Note: Data migration from 'users' to 'auth_user' and 'chat_users' should be done separately
-- The old 'users' table will remain for now to prevent data loss
-- After successful migration, you can drop the old 'users' table manually
