--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4 (Debian 15.4-2.pgdg120+1)
-- Dumped by pg_dump version 15.4 (Debian 15.4-2.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Image; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."Image" (
    id text NOT NULL,
    url text NOT NULL,
    "createdAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Image" OWNER TO admin;

--
-- Name: Key; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."Key" (
    id text NOT NULL,
    hashed_password text,
    user_id text NOT NULL
);


ALTER TABLE public."Key" OWNER TO admin;

--
-- Name: User; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."User" (
    id text NOT NULL,
    email text NOT NULL,
    "firstName" text NOT NULL,
    "lastName" text NOT NULL,
    bio text,
    "avatarId" text NOT NULL,
    verified boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."User" OWNER TO admin;

--
-- Data for Name: Image; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."Image" (id, url, "createdAt") FROM stdin;
\.


--
-- Data for Name: Key; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."Key" (id, hashed_password, user_id) FROM stdin;
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."User" (id, email, "firstName", "lastName", bio, "avatarId", verified, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Name: Image Image_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Image"
    ADD CONSTRAINT "Image_pkey" PRIMARY KEY (id);


--
-- Name: Key Key_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Key"
    ADD CONSTRAINT "Key_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: Image_id_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX "Image_id_key" ON public."Image" USING btree (id);


--
-- Name: Key_id_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX "Key_id_key" ON public."Key" USING btree (id);


--
-- Name: Key_user_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX "Key_user_id_idx" ON public."Key" USING btree (user_id);


--
-- Name: User_avatarId_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX "User_avatarId_key" ON public."User" USING btree ("avatarId");


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: User_id_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX "User_id_key" ON public."User" USING btree (id);


--
-- Name: Key Key_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Key"
    ADD CONSTRAINT "Key_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: User User_avatarId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_avatarId_fkey" FOREIGN KEY ("avatarId") REFERENCES public."Image"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

