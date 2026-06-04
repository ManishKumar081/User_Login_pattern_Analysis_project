--
-- PostgreSQL database dump
--

\restrict 59U4cy9zyUdPUJ1w45RqlxyQKbIDrrLWEGaGHub55K7O8nTdn1ifd06lGxFMeFt

-- Dumped from database version 18.4
-- Dumped by pg_dump version 18.4

-- Started on 2026-06-04 14:20:54

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

--
-- TOC entry 6 (class 2615 OID 16385)
-- Name: security; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA security;


ALTER SCHEMA security OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 225 (class 1259 OID 16417)
-- Name: login_risk_analysis; Type: TABLE; Schema: security; Owner: postgres
--

CREATE TABLE security.login_risk_analysis (
    analysis_id bigint NOT NULL,
    log_id bigint,
    risk_score integer DEFAULT 0,
    threat_level character varying(30),
    risk_reason text,
    recommended_action text,
    analyzed_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE security.login_risk_analysis OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 16416)
-- Name: login_risk_analysis_analysis_id_seq; Type: SEQUENCE; Schema: security; Owner: postgres
--

CREATE SEQUENCE security.login_risk_analysis_analysis_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE security.login_risk_analysis_analysis_id_seq OWNER TO postgres;

--
-- TOC entry 5043 (class 0 OID 0)
-- Dependencies: 224
-- Name: login_risk_analysis_analysis_id_seq; Type: SEQUENCE OWNED BY; Schema: security; Owner: postgres
--

ALTER SEQUENCE security.login_risk_analysis_analysis_id_seq OWNED BY security.login_risk_analysis.analysis_id;


--
-- TOC entry 223 (class 1259 OID 16401)
-- Name: user_login_logs; Type: TABLE; Schema: security; Owner: postgres
--

CREATE TABLE security.user_login_logs (
    log_id bigint NOT NULL,
    user_id integer,
    login_time timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    ip_address inet,
    login_location character varying(100),
    device jsonb,
    status character varying(20)
);


ALTER TABLE security.user_login_logs OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 16400)
-- Name: user_login_logs_log_id_seq; Type: SEQUENCE; Schema: security; Owner: postgres
--

CREATE SEQUENCE security.user_login_logs_log_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE security.user_login_logs_log_id_seq OWNER TO postgres;

--
-- TOC entry 5044 (class 0 OID 0)
-- Dependencies: 222
-- Name: user_login_logs_log_id_seq; Type: SEQUENCE OWNED BY; Schema: security; Owner: postgres
--

ALTER SEQUENCE security.user_login_logs_log_id_seq OWNED BY security.user_login_logs.log_id;


--
-- TOC entry 221 (class 1259 OID 16387)
-- Name: users; Type: TABLE; Schema: security; Owner: postgres
--

CREATE TABLE security.users (
    user_id integer NOT NULL,
    username character varying(100) NOT NULL,
    password character varying(225) NOT NULL,
    is_active boolean DEFAULT true,
    enter_by character varying(100),
    entry_date_time timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE security.users OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16386)
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: security; Owner: postgres
--

CREATE SEQUENCE security.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE security.users_user_id_seq OWNER TO postgres;

--
-- TOC entry 5045 (class 0 OID 0)
-- Dependencies: 220
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: security; Owner: postgres
--

ALTER SEQUENCE security.users_user_id_seq OWNED BY security.users.user_id;


--
-- TOC entry 4872 (class 2604 OID 16420)
-- Name: login_risk_analysis analysis_id; Type: DEFAULT; Schema: security; Owner: postgres
--

ALTER TABLE ONLY security.login_risk_analysis ALTER COLUMN analysis_id SET DEFAULT nextval('security.login_risk_analysis_analysis_id_seq'::regclass);


--
-- TOC entry 4870 (class 2604 OID 16404)
-- Name: user_login_logs log_id; Type: DEFAULT; Schema: security; Owner: postgres
--

ALTER TABLE ONLY security.user_login_logs ALTER COLUMN log_id SET DEFAULT nextval('security.user_login_logs_log_id_seq'::regclass);


--
-- TOC entry 4867 (class 2604 OID 16390)
-- Name: users user_id; Type: DEFAULT; Schema: security; Owner: postgres
--

ALTER TABLE ONLY security.users ALTER COLUMN user_id SET DEFAULT nextval('security.users_user_id_seq'::regclass);


--
-- TOC entry 5037 (class 0 OID 16417)
-- Dependencies: 225
-- Data for Name: login_risk_analysis; Type: TABLE DATA; Schema: security; Owner: postgres
--

COPY security.login_risk_analysis (analysis_id, log_id, risk_score, threat_level, risk_reason, recommended_action, analyzed_at) FROM stdin;
\.


--
-- TOC entry 5035 (class 0 OID 16401)
-- Dependencies: 223
-- Data for Name: user_login_logs; Type: TABLE DATA; Schema: security; Owner: postgres
--

COPY security.user_login_logs (log_id, user_id, login_time, ip_address, login_location, device, status) FROM stdin;
\.


--
-- TOC entry 5033 (class 0 OID 16387)
-- Dependencies: 221
-- Data for Name: users; Type: TABLE DATA; Schema: security; Owner: postgres
--

COPY security.users (user_id, username, password, is_active, enter_by, entry_date_time) FROM stdin;
\.


--
-- TOC entry 5046 (class 0 OID 0)
-- Dependencies: 224
-- Name: login_risk_analysis_analysis_id_seq; Type: SEQUENCE SET; Schema: security; Owner: postgres
--

SELECT pg_catalog.setval('security.login_risk_analysis_analysis_id_seq', 1, false);


--
-- TOC entry 5047 (class 0 OID 0)
-- Dependencies: 222
-- Name: user_login_logs_log_id_seq; Type: SEQUENCE SET; Schema: security; Owner: postgres
--

SELECT pg_catalog.setval('security.user_login_logs_log_id_seq', 1, false);


--
-- TOC entry 5048 (class 0 OID 0)
-- Dependencies: 220
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: security; Owner: postgres
--

SELECT pg_catalog.setval('security.users_user_id_seq', 1, false);


--
-- TOC entry 4882 (class 2606 OID 16427)
-- Name: login_risk_analysis login_risk_analysis_pkey; Type: CONSTRAINT; Schema: security; Owner: postgres
--

ALTER TABLE ONLY security.login_risk_analysis
    ADD CONSTRAINT login_risk_analysis_pkey PRIMARY KEY (analysis_id);


--
-- TOC entry 4880 (class 2606 OID 16410)
-- Name: user_login_logs user_login_logs_pkey; Type: CONSTRAINT; Schema: security; Owner: postgres
--

ALTER TABLE ONLY security.user_login_logs
    ADD CONSTRAINT user_login_logs_pkey PRIMARY KEY (log_id);


--
-- TOC entry 4876 (class 2606 OID 16397)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: security; Owner: postgres
--

ALTER TABLE ONLY security.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- TOC entry 4878 (class 2606 OID 16399)
-- Name: users users_username_key; Type: CONSTRAINT; Schema: security; Owner: postgres
--

ALTER TABLE ONLY security.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- TOC entry 4884 (class 2606 OID 16428)
-- Name: login_risk_analysis login_risk_analysis_log_id_fkey; Type: FK CONSTRAINT; Schema: security; Owner: postgres
--

ALTER TABLE ONLY security.login_risk_analysis
    ADD CONSTRAINT login_risk_analysis_log_id_fkey FOREIGN KEY (log_id) REFERENCES security.user_login_logs(log_id) ON DELETE CASCADE;


--
-- TOC entry 4883 (class 2606 OID 16411)
-- Name: user_login_logs user_login_logs_user_id_fkey; Type: FK CONSTRAINT; Schema: security; Owner: postgres
--

ALTER TABLE ONLY security.user_login_logs
    ADD CONSTRAINT user_login_logs_user_id_fkey FOREIGN KEY (user_id) REFERENCES security.users(user_id);


-- Completed on 2026-06-04 14:20:54

--
-- PostgreSQL database dump complete
--

\unrestrict 59U4cy9zyUdPUJ1w45RqlxyQKbIDrrLWEGaGHub55K7O8nTdn1ifd06lGxFMeFt

