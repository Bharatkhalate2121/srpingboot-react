--
-- PostgreSQL database dump
--

-- Dumped from database version 17.3 (Debian 17.3-3.pgdg120+1)
-- Dumped by pg_dump version 17.3 (Debian 17.3-3.pgdg120+1)

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
-- Name: crust; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.crust (
    crust_id integer NOT NULL,
    name character varying(56) NOT NULL
);


ALTER TABLE public.crust OWNER TO postgres;

--
-- Name: crust_crust_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.crust_crust_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.crust_crust_id_seq OWNER TO postgres;

--
-- Name: crust_crust_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.crust_crust_id_seq OWNED BY public.crust.crust_id;


--
-- Name: crust_order; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.crust_order (
    crust_order_id integer NOT NULL,
    order_id integer,
    order_line_id integer,
    crust_id integer
);


ALTER TABLE public.crust_order OWNER TO postgres;

--
-- Name: crust_order_crust_order_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.crust_order_crust_order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.crust_order_crust_order_id_seq OWNER TO postgres;

--
-- Name: crust_order_crust_order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.crust_order_crust_order_id_seq OWNED BY public.crust_order.crust_order_id;


--
-- Name: customer; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.customer (
    customer_id integer NOT NULL,
    first_name character varying(30) NOT NULL,
    last_name character varying(30),
    address character varying(255),
    phone_number character varying(20),
    email_address character varying(70) NOT NULL
);


ALTER TABLE public.customer OWNER TO postgres;

--
-- Name: customer_customer_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.customer_customer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.customer_customer_id_seq OWNER TO postgres;

--
-- Name: customer_customer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.customer_customer_id_seq OWNED BY public.customer.customer_id;


--
-- Name: order_line; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.order_line (
    order_line_id integer NOT NULL,
    order_id integer,
    pizza_id integer,
    size character varying(30) NOT NULL,
    quantity integer NOT NULL,
    total_price integer NOT NULL
);


ALTER TABLE public.order_line OWNER TO postgres;

--
-- Name: order_line_order_line_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.order_line_order_line_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.order_line_order_line_id_seq OWNER TO postgres;

--
-- Name: order_line_order_line_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.order_line_order_line_id_seq OWNED BY public.order_line.order_line_id;


--
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    order_id integer NOT NULL,
    customer_id integer,
    status character varying(30) DEFAULT 'CREATED'::character varying,
    total_amount integer NOT NULL,
    order_date_time timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    delivery_address character varying(255),
    valid boolean DEFAULT true
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- Name: orders_order_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orders_order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.orders_order_id_seq OWNER TO postgres;

--
-- Name: orders_order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orders_order_id_seq OWNED BY public.orders.order_id;


--
-- Name: pizza; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pizza (
    pizza_id integer NOT NULL,
    name character varying(50) NOT NULL,
    description character varying(255),
    type character varying(10),
    image_url character varying(255),
    price_regular_size integer NOT NULL,
    price_medium_size integer NOT NULL,
    price_large_size integer NOT NULL
);


ALTER TABLE public.pizza OWNER TO postgres;

--
-- Name: pizza_pizza_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pizza_pizza_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.pizza_pizza_id_seq OWNER TO postgres;

--
-- Name: pizza_pizza_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pizza_pizza_id_seq OWNED BY public.pizza.pizza_id;


--
-- Name: sides; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sides (
    sides_id integer NOT NULL,
    name character varying(56) NOT NULL,
    price integer NOT NULL,
    available boolean DEFAULT true
);


ALTER TABLE public.sides OWNER TO postgres;

--
-- Name: sides_order; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sides_order (
    sides_order_id integer NOT NULL,
    order_id integer,
    sides_id integer,
    quantity integer DEFAULT 1
);


ALTER TABLE public.sides_order OWNER TO postgres;

--
-- Name: sides_order_sides_order_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sides_order_sides_order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.sides_order_sides_order_id_seq OWNER TO postgres;

--
-- Name: sides_order_sides_order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sides_order_sides_order_id_seq OWNED BY public.sides_order.sides_order_id;


--
-- Name: sides_sides_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sides_sides_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.sides_sides_id_seq OWNER TO postgres;

--
-- Name: sides_sides_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sides_sides_id_seq OWNED BY public.sides.sides_id;


--
-- Name: topping; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.topping (
    topping_id integer NOT NULL,
    name character varying(56) NOT NULL,
    type character varying(28) NOT NULL,
    topping_price integer NOT NULL,
    available boolean DEFAULT true
);


ALTER TABLE public.topping OWNER TO postgres;

--
-- Name: topping_order; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.topping_order (
    topping_order_id integer NOT NULL,
    order_id integer,
    order_line_id integer,
    topping_id integer
);


ALTER TABLE public.topping_order OWNER TO postgres;

--
-- Name: topping_order_topping_order_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.topping_order_topping_order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.topping_order_topping_order_id_seq OWNER TO postgres;

--
-- Name: topping_order_topping_order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.topping_order_topping_order_id_seq OWNED BY public.topping_order.topping_order_id;


--
-- Name: topping_topping_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.topping_topping_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.topping_topping_id_seq OWNER TO postgres;

--
-- Name: topping_topping_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.topping_topping_id_seq OWNED BY public.topping.topping_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id character varying(70) NOT NULL,
    admin_user boolean DEFAULT false,
    password character varying(25) NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: crust crust_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.crust ALTER COLUMN crust_id SET DEFAULT nextval('public.crust_crust_id_seq'::regclass);


--
-- Name: crust_order crust_order_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.crust_order ALTER COLUMN crust_order_id SET DEFAULT nextval('public.crust_order_crust_order_id_seq'::regclass);


--
-- Name: customer customer_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customer ALTER COLUMN customer_id SET DEFAULT nextval('public.customer_customer_id_seq'::regclass);


--
-- Name: order_line order_line_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_line ALTER COLUMN order_line_id SET DEFAULT nextval('public.order_line_order_line_id_seq'::regclass);


--
-- Name: orders order_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders ALTER COLUMN order_id SET DEFAULT nextval('public.orders_order_id_seq'::regclass);


--
-- Name: pizza pizza_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pizza ALTER COLUMN pizza_id SET DEFAULT nextval('public.pizza_pizza_id_seq'::regclass);


--
-- Name: sides sides_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sides ALTER COLUMN sides_id SET DEFAULT nextval('public.sides_sides_id_seq'::regclass);


--
-- Name: sides_order sides_order_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sides_order ALTER COLUMN sides_order_id SET DEFAULT nextval('public.sides_order_sides_order_id_seq'::regclass);


--
-- Name: topping topping_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.topping ALTER COLUMN topping_id SET DEFAULT nextval('public.topping_topping_id_seq'::regclass);


--
-- Name: topping_order topping_order_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.topping_order ALTER COLUMN topping_order_id SET DEFAULT nextval('public.topping_order_topping_order_id_seq'::regclass);


--
-- Data for Name: crust; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.crust (crust_id, name) FROM stdin;
1	New hand-tossed
2	Wheat thin-crust
3	Cheese Burst
4	Fresh pan pizza
\.


--
-- Data for Name: crust_order; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.crust_order (crust_order_id, order_id, order_line_id, crust_id) FROM stdin;
1	6	13	4
2	7	14	4
3	7	15	1
4	8	16	4
5	8	17	1
6	9	18	4
7	9	19	1
8	10	20	4
9	10	21	1
10	11	22	2
11	12	23	2
12	13	24	2
13	14	25	2
14	15	26	2
15	16	27	2
16	17	28	2
17	18	29	2
18	19	30	2
19	20	31	2
20	21	32	2
21	22	33	2
22	23	34	2
23	24	35	2
24	25	36	2
25	26	37	2
26	27	38	2
27	28	39	2
28	29	40	1
29	30	41	1
30	31	42	1
31	31	43	1
32	32	44	2
33	32	45	2
37	35	49	1
40	38	52	1
41	39	53	1
\.


--
-- Data for Name: customer; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.customer (customer_id, first_name, last_name, address, phone_number, email_address) FROM stdin;
1	Michael	John	Kenmare Mansions, London, UK, NW6 1ET	2075894550	abc@gmail.com
5	Bharat	Khalate	Cerebrum	9090807060	abc@gmail.vom
6	Bharat	Khalate	Ravi	1234567890	abc@pqr.com
7	Bharat	bajhk	kjdjjk@hsghks.cos	9876543320	kjdjjk@hsghks.cos
10	Bharat	hshbs	s s shbsbs	1234567890	bharat50@gmail.com
11	Bharat	khalate	bk@50gmail.com	8902763451	bk@50gmail.com
12	Bharat	Khalate	kjdjjk@hsghks.cos	8010269748	pqr@gmail.comm
14	Bharat	Shastri	Cerebrum	8010269748	bharat505@gmail.com
19	Jagganath	Shastri	Cerebrum	1020304050	xyz@gmail.com
\.


--
-- Data for Name: order_line; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.order_line (order_line_id, order_id, pizza_id, size, quantity, total_price) FROM stdin;
2	2	1	Regular	2	300
3	3	1	Regular	2	300
4	4	1	Regular	2	300
5	5	1	Regular	2	300
6	5	1	Regular	2	300
12	1	1	Regular	2	300
13	6	1	Medium	7	1830
14	7	1	Medium	7	1830
15	7	14	Medium	7	335
16	8	1	Medium	7	1830
17	8	14	Medium	7	335
18	9	1	Medium	7	1830
19	9	14	Medium	7	335
20	10	1	Medium	7	1830
21	10	14	Medium	7	335
22	11	14	Large	5	150
23	12	14	Large	5	150
24	13	14	Large	5	150
25	14	14	Large	5	150
26	15	14	Large	5	150
27	16	14	Large	5	150
28	17	14	Large	5	150
29	18	14	Large	5	150
30	19	14	Large	5	150
31	20	14	Large	5	150
32	21	14	Large	5	150
33	22	14	Large	5	150
34	23	14	Large	5	150
35	24	14	Large	5	150
36	25	14	Large	5	150
37	26	14	Large	5	150
38	27	14	Large	5	150
39	28	14	Large	5	150
40	29	14	Regular	1	17
41	30	14	Regular	1	17
42	31	14	Regular	1	17
43	31	1	Large	2	955
44	32	1	Medium	3	835
45	32	14	Large	4	154
49	35	1	Large	1	505
52	38	14	Regular	4	68
53	39	1	Regular	1	150
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders (order_id, customer_id, status, total_amount, order_date_time, delivery_address, valid) FROM stdin;
2	1	CREATED	300	2025-03-11 11:22:05.308787	Kenmare Mansions	t
3	1	CREATED	300	2025-03-11 11:23:45.550654	Kenmare Mansions	t
4	1	CREATED	300	2025-03-11 11:43:59.607752	Kenmare Mansions	t
5	1	CREATED	300	2025-03-11 11:44:11.628178	Kenmare Mansions	t
1	1	CREATED	300	2025-03-11 11:00:07.951722	Kenmare Mansions, London, UK, NW6 1ET	t
6	1	CREATED	2760	2025-03-16 16:55:27.740442	kalyani nagar	t
7	1	CREATED	2760	2025-03-16 16:57:13.71998	kalyani nagar	t
8	1	CREATED	2760	2025-03-16 17:00:21.521774	kalyani nagar	t
9	1	CREATED	2760	2025-03-16 17:02:01.864581	kalyani nagar	t
10	1	CREATED	2760	2025-03-16 17:02:54.234423	kalyani nagar	t
11	5	CREATED	150	2025-03-17 05:54:51.735642	Cerebrum	t
12	5	CREATED	150	2025-03-17 05:54:52.08145	Cerebrum	t
13	5	CREATED	150	2025-03-17 05:54:53.630854	Cerebrum	t
14	5	CREATED	150	2025-03-17 05:54:54.847004	Cerebrum	t
15	5	CREATED	150	2025-03-17 05:54:55.017536	Cerebrum	t
16	5	CREATED	150	2025-03-17 05:54:55.198141	Cerebrum	t
17	5	CREATED	150	2025-03-17 05:55:05.53125	Cerebrum	t
18	5	CREATED	150	2025-03-17 05:55:06.19985	Cerebrum	t
19	5	CREATED	150	2025-03-17 05:55:11.199831	Cerebrum	t
20	5	CREATED	150	2025-03-17 05:55:11.889355	Cerebrum	t
21	5	CREATED	150	2025-03-17 05:55:12.068144	Cerebrum	t
22	5	CREATED	150	2025-03-17 05:55:46.7074	Cerebrum	t
23	5	CREATED	150	2025-03-17 05:57:00.854918	Cerebrum	t
24	5	CREATED	150	2025-03-17 05:57:15.171452	Cerebrum	t
25	5	CREATED	150	2025-03-17 05:59:24.428564	Cerebrum	t
26	5	CREATED	150	2025-03-17 05:59:37.122663	Cerebrum	t
27	5	CREATED	150	2025-03-17 05:59:44.174202	Cerebrum	t
28	5	CREATED	150	2025-03-17 06:00:12.349414	Cerebrum	t
29	5	CREATED	17	2025-03-17 06:02:24.95807	Cerebrum	t
30	5	CREATED	17	2025-03-17 06:03:04.735187	Cerebrum	t
31	5	CREATED	1697	2025-03-17 12:29:21.681051	Cerebrum	t
32	6	CREATED	1134	2025-03-17 12:47:18.019351	Ravi	t
35	6	CREATED	505	2025-03-17 16:09:54.973632	Ravi	t
38	6	CREATED	68	2025-03-18 18:49:19.441073	Ravi	f
39	6	CREATED	150	2025-03-18 19:01:36.083578	Ravi	t
\.


--
-- Data for Name: pizza; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pizza (pizza_id, name, description, type, image_url, price_regular_size, price_medium_size, price_large_size) FROM stdin;
1	Margherita	Classic cheese and tomato pizza	Veg	https://tinyurl.com/pizza-002	150	250	450
8	heje	hebedk	Veg	http://localhost:8080/images/c9be513f-20fd-4a78-b90a-74b1413a28e1.jpeg	2	8	3780
14	techbulls special	this is very good pizza	Non Veg	http://localhost:8080/images/097278cd-4131-4c6d-803d-74087fbb69e9.jpeg	17	30	26
13	Project 377	jejd	Veg	http://localhost:8080/images/1d544e45-b3c1-42f6-a622-de9224b1de44.jpeg	44	23	55
6	Burst	gvd	Veg	http://localhost:8080/images/a596f019-634e-4b37-ba60-8f95abfd33d4.jpeg	2	2	2
5	Burst	gvd	Veg	http://localhost:8080/images/96e68e45-8344-44a2-b9b2-2cc57097d1d0.jpeg	2	2	2
10	heje	hebedk	Veg	http://localhost:8080/images/b9d217a2-9fe8-4fce-846b-fa2417a12792.jpeg	2	8	1
9	heje bro	hebedk	Veg	http://localhost:8080/images/378a59c2-d469-4da7-944b-c3c645bbef38.jpeg	2	8	3780
4	Burst	gvd	Veg	http://localhost:8080/images/7fbd964e-fb02-442d-ba82-3834c6a487c4.jpeg	2	2	2
18	abc1	very good pizza	Veg	http://localhost:8080/images/73e551cc-9208-4d4e-ad49-123ea61951cc.jpg	150	300	450
3	Margerita	atyaaj	Veg	http://localhost:8080/images/2c99d10a-c86b-4b28-b48e-e00c16a4cb63.jpeg	689	687	6856
\.


--
-- Data for Name: sides; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sides (sides_id, name, price, available) FROM stdin;
1	Cold Drink	55	t
2	Mousse Cake	90	t
\.


--
-- Data for Name: sides_order; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sides_order (sides_order_id, order_id, sides_id, quantity) FROM stdin;
1	10	2	1
2	10	1	1
3	10	2	5
4	31	2	5
5	31	1	5
6	32	2	1
7	32	1	1
\.


--
-- Data for Name: topping; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.topping (topping_id, name, type, topping_price, available) FROM stdin;
1	Panner	Veg	35	t
2	Black Olive	Veg	20	t
3	Capsicum	Veg	25	t
4	Mushroom	Veg	30	t
5	Fresh Tomato	Veg	10	t
6	Chiken Tikka	Non Veg	35	t
7	Barbeque Chiken	Non Veg	45	t
8	Grilled Chiken	Non Veg	40	t
\.


--
-- Data for Name: topping_order; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.topping_order (topping_order_id, order_id, order_line_id, topping_id) FROM stdin;
1	7	14	1
2	7	14	2
3	7	14	3
4	8	16	1
5	8	16	2
6	8	16	3
7	9	18	1
8	9	18	2
9	9	18	3
10	10	20	1
11	10	20	2
12	10	20	3
13	11	22	3
14	11	22	2
15	11	22	7
16	12	23	3
17	12	23	2
18	12	23	7
19	13	24	3
20	13	24	2
21	13	24	7
22	14	25	3
23	14	25	2
24	14	25	7
25	15	26	3
26	15	26	2
27	15	26	7
28	16	27	3
29	16	27	2
30	16	27	7
31	17	28	3
32	17	28	2
33	17	28	7
34	18	29	3
35	18	29	2
36	18	29	7
37	19	30	3
38	19	30	2
39	19	30	7
40	20	31	3
41	20	31	2
42	20	31	7
43	21	32	3
44	21	32	2
45	21	32	7
46	22	33	3
47	22	33	2
48	22	33	7
49	23	34	3
50	23	34	2
51	23	34	7
52	24	35	3
53	24	35	2
54	24	35	7
55	25	36	3
56	25	36	2
57	25	36	7
58	26	37	3
59	26	37	2
60	26	37	7
61	27	38	3
62	27	38	2
63	27	38	7
64	28	39	3
65	28	39	2
66	28	39	7
67	31	43	2
68	31	43	1
69	31	43	3
70	31	43	4
71	31	43	5
72	32	44	1
73	32	44	2
74	32	44	4
75	32	45	1
76	32	45	2
77	32	45	4
78	32	45	7
79	35	49	1
80	35	49	2
81	35	49	3
82	35	49	4
83	35	49	5
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (user_id, admin_user, password) FROM stdin;
kjdjjk@hsghks.cos	f	1234567890
bharat50@gmail.com	f	abc1234556
abc@pqr.com	t	1234567890
bk@50gmail.com	f	1234567890
pqr@gmail.comm	f	1
bharat505@gmail.com	f	1
xyz@gmail.com	f	asdfghjkla
abc@gmail.vom	f	1234567890
\.


--
-- Name: crust_crust_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.crust_crust_id_seq', 4, true);


--
-- Name: crust_order_crust_order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.crust_order_crust_order_id_seq', 41, true);


--
-- Name: customer_customer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.customer_customer_id_seq', 26, true);


--
-- Name: order_line_order_line_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.order_line_order_line_id_seq', 53, true);


--
-- Name: orders_order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_order_id_seq', 39, true);


--
-- Name: pizza_pizza_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pizza_pizza_id_seq', 18, true);


--
-- Name: sides_order_sides_order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sides_order_sides_order_id_seq', 8, true);


--
-- Name: sides_sides_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sides_sides_id_seq', 2, true);


--
-- Name: topping_order_topping_order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.topping_order_topping_order_id_seq', 88, true);


--
-- Name: topping_topping_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.topping_topping_id_seq', 8, true);


--
-- Name: crust_order crust_order_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.crust_order
    ADD CONSTRAINT crust_order_pkey PRIMARY KEY (crust_order_id);


--
-- Name: crust crust_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.crust
    ADD CONSTRAINT crust_pkey PRIMARY KEY (crust_id);


--
-- Name: customer customer_email_address_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customer
    ADD CONSTRAINT customer_email_address_key UNIQUE (email_address);


--
-- Name: customer customer_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customer
    ADD CONSTRAINT customer_pkey PRIMARY KEY (customer_id);


--
-- Name: order_line order_line_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_line
    ADD CONSTRAINT order_line_pkey PRIMARY KEY (order_line_id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (order_id);


--
-- Name: pizza pizza_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pizza
    ADD CONSTRAINT pizza_pkey PRIMARY KEY (pizza_id);


--
-- Name: sides_order sides_order_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sides_order
    ADD CONSTRAINT sides_order_pkey PRIMARY KEY (sides_order_id);


--
-- Name: sides sides_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sides
    ADD CONSTRAINT sides_pkey PRIMARY KEY (sides_id);


--
-- Name: topping_order topping_order_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.topping_order
    ADD CONSTRAINT topping_order_pkey PRIMARY KEY (topping_order_id);


--
-- Name: topping topping_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.topping
    ADD CONSTRAINT topping_pkey PRIMARY KEY (topping_id);


--
-- Name: users users_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_unique UNIQUE (user_id);


--
-- Name: crust_order crust_order_crust_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.crust_order
    ADD CONSTRAINT crust_order_crust_id_fkey FOREIGN KEY (crust_id) REFERENCES public.crust(crust_id);


--
-- Name: crust_order crust_order_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.crust_order
    ADD CONSTRAINT crust_order_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(order_id);


--
-- Name: crust_order crust_order_order_line_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.crust_order
    ADD CONSTRAINT crust_order_order_line_id_fkey FOREIGN KEY (order_line_id) REFERENCES public.order_line(order_line_id);


--
-- Name: order_line order_line_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_line
    ADD CONSTRAINT order_line_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(order_id);


--
-- Name: order_line order_line_pizza_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_line
    ADD CONSTRAINT order_line_pizza_id_fkey FOREIGN KEY (pizza_id) REFERENCES public.pizza(pizza_id);


--
-- Name: orders orders_customer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customer(customer_id);


--
-- Name: sides_order sides_order_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sides_order
    ADD CONSTRAINT sides_order_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(order_id);


--
-- Name: sides_order sides_order_sides_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sides_order
    ADD CONSTRAINT sides_order_sides_id_fkey FOREIGN KEY (sides_id) REFERENCES public.sides(sides_id);


--
-- Name: topping_order topping_order_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.topping_order
    ADD CONSTRAINT topping_order_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(order_id);


--
-- Name: topping_order topping_order_order_line_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.topping_order
    ADD CONSTRAINT topping_order_order_line_id_fkey FOREIGN KEY (order_line_id) REFERENCES public.order_line(order_line_id);


--
-- Name: topping_order topping_order_topping_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.topping_order
    ADD CONSTRAINT topping_order_topping_id_fkey FOREIGN KEY (topping_id) REFERENCES public.topping(topping_id);


--
-- Name: users users_uesr_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_uesr_id_fkey FOREIGN KEY (user_id) REFERENCES public.customer(email_address);


--
-- PostgreSQL database dump complete
--

