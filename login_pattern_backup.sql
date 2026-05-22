--
-- PostgreSQL database dump
--

\restrict RHTIcpmoqJv6IGYLt2ZD5XcJvP2OMtmxgmpzyjRIwQEzgJPZhTfegdne0w8BlJN

-- Dumped from database version 18.4
-- Dumped by pg_dump version 18.4

-- Started on 2026-05-22 21:04:29

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
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
-- TOC entry 222 (class 1259 OID 16405)
-- Name: user_login_logs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_login_logs (
    log_id bigint CONSTRAINT user_login_logs_id_not_null NOT NULL,
    username character varying(100),
    login_time timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    ip_address inet,
    login_location character varying(100),
    device jsonb,
    status character varying(20)
);


ALTER TABLE public.user_login_logs OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16404)
-- Name: user_login_logs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_login_logs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_login_logs_id_seq OWNER TO postgres;

--
-- TOC entry 5029 (class 0 OID 0)
-- Dependencies: 221
-- Name: user_login_logs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_login_logs_id_seq OWNED BY public.user_login_logs.log_id;


--
-- TOC entry 220 (class 1259 OID 16390)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    uid integer CONSTRAINT users_serial_not_null NOT NULL,
    username character varying(100) NOT NULL,
    password_hash character varying(255) NOT NULL,
    is_active boolean DEFAULT true,
    enter_by character varying(100),
    entry_date_time timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16389)
-- Name: users_serial_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_serial_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_serial_seq OWNER TO postgres;

--
-- TOC entry 5030 (class 0 OID 0)
-- Dependencies: 219
-- Name: users_serial_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_serial_seq OWNED BY public.users.uid;


--
-- TOC entry 4864 (class 2604 OID 16408)
-- Name: user_login_logs log_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_login_logs ALTER COLUMN log_id SET DEFAULT nextval('public.user_login_logs_id_seq'::regclass);


--
-- TOC entry 4861 (class 2604 OID 16393)
-- Name: users uid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN uid SET DEFAULT nextval('public.users_serial_seq'::regclass);


--
-- TOC entry 5023 (class 0 OID 16405)
-- Dependencies: 222
-- Data for Name: user_login_logs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_login_logs (log_id, username, login_time, ip_address, login_location, device, status) FROM stdin;
\.


--
-- TOC entry 5021 (class 0 OID 16390)
-- Dependencies: 220
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (uid, username, password_hash, is_active, enter_by, entry_date_time) FROM stdin;
\.


--
-- TOC entry 5031 (class 0 OID 0)
-- Dependencies: 221
-- Name: user_login_logs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_login_logs_id_seq', 1, false);


--
-- TOC entry 5032 (class 0 OID 0)
-- Dependencies: 219
-- Name: users_serial_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_serial_seq', 1, false);


--
-- TOC entry 4871 (class 2606 OID 16414)
-- Name: user_login_logs user_login_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_login_logs
    ADD CONSTRAINT user_login_logs_pkey PRIMARY KEY (log_id);


--
-- TOC entry 4867 (class 2606 OID 16400)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (uid);


--
-- TOC entry 4869 (class 2606 OID 16402)
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- TOC entry 4872 (class 2606 OID 16415)
-- Name: user_login_logs user_login_logs_username_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_login_logs
    ADD CONSTRAINT user_login_logs_username_fkey FOREIGN KEY (username) REFERENCES public.users(username);


-- Completed on 2026-05-22 21:04:29

--
-- PostgreSQL database dump complete
--

\unrestrict RHTIcpmoqJv6IGYLt2ZD5XcJvP2OMtmxgmpzyjRIwQEzgJPZhTfegdne0w8BlJN

