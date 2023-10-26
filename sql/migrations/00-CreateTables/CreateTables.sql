CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS public."Example" (
    "CriadoEm" timestamp without time zone NOT NULL DEFAULT now(),
    "AtualizadoEm" timestamp without time zone NOT NULL DEFAULT now(),
    "Id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "Name" character varying COLLATE pg_catalog."default" NOT NULL,
    "Email" character varying COLLATE pg_catalog."default" NOT NULL,
    "IsActive" boolean NOT NULL DEFAULT true,
    CONSTRAINT "PK_EXAMPLE_ID" PRIMARY KEY ("Id")
) TABLESPACE pg_default;

ALTER TABLE
    IF EXISTS public."Example" OWNER to root;

CREATE INDEX IF NOT EXISTS "IDX_EXAMPLE_ID" ON public."Example" USING btree ("Id" ASC NULLS LAST) TABLESPACE pg_default;
