PGDMP     9                    y            hw4    14.1    14.1 
    ?           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            ?           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            ?           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            ?           1262    16386    hw4    DATABASE     X   CREATE DATABASE hw4 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.UTF-8';
    DROP DATABASE hw4;
                postgres    false            ?           0    0    DATABASE hw4    COMMENT     )   COMMENT ON DATABASE hw4 IS 'Homework 4';
                   postgres    false    3580            ?            1259    16390    posts    TABLE     ?   CREATE TABLE public.posts (
    id integer NOT NULL,
    title character varying NOT NULL,
    content text,
    author character varying NOT NULL,
    link character varying,
    likes integer DEFAULT 0 NOT NULL
);
    DROP TABLE public.posts;
       public         heap    postgres    false            ?            1259    16395    posts_id_seq    SEQUENCE     ?   ALTER TABLE public.posts ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.posts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    209            ?          0    16390    posts 
   TABLE DATA           H   COPY public.posts (id, title, content, author, link, likes) FROM stdin;
    public          postgres    false    209   =	       ?           0    0    posts_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.posts_id_seq', 1, false);
          public          postgres    false    210            i           2606    16394    posts posts_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.posts DROP CONSTRAINT posts_pkey;
       public            postgres    false    209            ?      x?????? ? ?     