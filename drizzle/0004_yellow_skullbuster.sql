-- Drop the existing "ex_link" column (if it exists)
ALTER TABLE "book" DROP COLUMN IF EXISTS "ex_link";

-- Recreate the "ex_link" column with JSONB data type and default value
ALTER TABLE book ADD COLUMN ex_link jsonb DEFAULT '{"goodreads": "", "libraryany": ""}'::jsonb;
