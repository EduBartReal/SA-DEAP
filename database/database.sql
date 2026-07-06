--
-- PostgreSQL database dump
--

\restrict FNmLliZ5929osbMntJQxUlSXGiC6HkgeffgzUXiu11tuaXZgObVciLQL1ha2Vye

-- Dumped from database version 18.0
-- Dumped by pg_dump version 18.0

-- Started on 2026-07-06 17:09:47

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
-- TOC entry 220 (class 1259 OID 106786)
-- Name: categorias; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categorias (
    id integer NOT NULL,
    nome character varying(100) NOT NULL
);


ALTER TABLE public.categorias OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 106785)
-- Name: categorias_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categorias_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categorias_id_seq OWNER TO postgres;

--
-- TOC entry 5035 (class 0 OID 0)
-- Dependencies: 219
-- Name: categorias_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categorias_id_seq OWNED BY public.categorias.id;


--
-- TOC entry 224 (class 1259 OID 106804)
-- Name: equipamentos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.equipamentos (
    id integer NOT NULL,
    numero_serie character varying(100) NOT NULL,
    modelo character varying(100) NOT NULL,
    status character varying(50) NOT NULL,
    categoria_id integer NOT NULL,
    setor_id integer NOT NULL
);


ALTER TABLE public.equipamentos OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 106803)
-- Name: equipamentos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.equipamentos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.equipamentos_id_seq OWNER TO postgres;

--
-- TOC entry 5036 (class 0 OID 0)
-- Dependencies: 223
-- Name: equipamentos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.equipamentos_id_seq OWNED BY public.equipamentos.id;


--
-- TOC entry 222 (class 1259 OID 106795)
-- Name: setores; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.setores (
    id integer NOT NULL,
    nome character varying(100) NOT NULL
);


ALTER TABLE public.setores OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 106794)
-- Name: setores_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.setores_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.setores_id_seq OWNER TO postgres;

--
-- TOC entry 5037 (class 0 OID 0)
-- Dependencies: 221
-- Name: setores_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.setores_id_seq OWNED BY public.setores.id;


--
-- TOC entry 4866 (class 2604 OID 106789)
-- Name: categorias id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categorias ALTER COLUMN id SET DEFAULT nextval('public.categorias_id_seq'::regclass);


--
-- TOC entry 4868 (class 2604 OID 106807)
-- Name: equipamentos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.equipamentos ALTER COLUMN id SET DEFAULT nextval('public.equipamentos_id_seq'::regclass);


--
-- TOC entry 4867 (class 2604 OID 106798)
-- Name: setores id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.setores ALTER COLUMN id SET DEFAULT nextval('public.setores_id_seq'::regclass);


--
-- TOC entry 5025 (class 0 OID 106786)
-- Dependencies: 220
-- Data for Name: categorias; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categorias (id, nome) FROM stdin;
1	Notebook
2	Monitor
3	Periférico
\.


--
-- TOC entry 5029 (class 0 OID 106804)
-- Dependencies: 224
-- Data for Name: equipamentos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.equipamentos (id, numero_serie, modelo, status, categoria_id, setor_id) FROM stdin;
1	SN001	Dell Latitude 5420	Disponível	1	1
2	SN002	LG UltraWide 29"	Em uso	2	2
3	SN003	Logitech MX Keys	Manutenção	3	1
\.


--
-- TOC entry 5027 (class 0 OID 106795)
-- Dependencies: 222
-- Data for Name: setores; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.setores (id, nome) FROM stdin;
1	TI
2	Financeiro
3	RH
\.


--
-- TOC entry 5038 (class 0 OID 0)
-- Dependencies: 219
-- Name: categorias_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categorias_id_seq', 3, true);


--
-- TOC entry 5039 (class 0 OID 0)
-- Dependencies: 223
-- Name: equipamentos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.equipamentos_id_seq', 4, true);


--
-- TOC entry 5040 (class 0 OID 0)
-- Dependencies: 221
-- Name: setores_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.setores_id_seq', 3, true);


--
-- TOC entry 4870 (class 2606 OID 106793)
-- Name: categorias categorias_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categorias
    ADD CONSTRAINT categorias_pkey PRIMARY KEY (id);


--
-- TOC entry 4874 (class 2606 OID 106815)
-- Name: equipamentos equipamentos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.equipamentos
    ADD CONSTRAINT equipamentos_pkey PRIMARY KEY (id);


--
-- TOC entry 4872 (class 2606 OID 106802)
-- Name: setores setores_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.setores
    ADD CONSTRAINT setores_pkey PRIMARY KEY (id);


--
-- TOC entry 4875 (class 2606 OID 106816)
-- Name: equipamentos fk_categoria; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.equipamentos
    ADD CONSTRAINT fk_categoria FOREIGN KEY (categoria_id) REFERENCES public.categorias(id);


--
-- TOC entry 4876 (class 2606 OID 106821)
-- Name: equipamentos fk_setor; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.equipamentos
    ADD CONSTRAINT fk_setor FOREIGN KEY (setor_id) REFERENCES public.setores(id);


-- Completed on 2026-07-06 17:09:47

--
-- PostgreSQL database dump complete
--

\unrestrict FNmLliZ5929osbMntJQxUlSXGiC6HkgeffgzUXiu11tuaXZgObVciLQL1ha2Vye

