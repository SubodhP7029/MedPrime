PGDMP         :                x            medprime    10.8    10.8 �    ,           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                       false            -           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                       false            .           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                       false            /           1262    45265    medprime    DATABASE     f   CREATE DATABASE medprime WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C' LC_CTYPE = 'C';
    DROP DATABASE medprime;
             postgres    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
             postgres    false            0           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                  postgres    false    3                        3079    13241    plpgsql 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;
    DROP EXTENSION plpgsql;
                  false            1           0    0    EXTENSION plpgsql    COMMENT     @   COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';
                       false    1            �            1259    45297 
   auth_group    TABLE     f   CREATE TABLE public.auth_group (
    id integer NOT NULL,
    name character varying(150) NOT NULL
);
    DROP TABLE public.auth_group;
       public         postgres    false    3            �            1259    45295    auth_group_id_seq    SEQUENCE     �   CREATE SEQUENCE public.auth_group_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.auth_group_id_seq;
       public       postgres    false    203    3            2           0    0    auth_group_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.auth_group_id_seq OWNED BY public.auth_group.id;
            public       postgres    false    202            �            1259    45307    auth_group_permissions    TABLE     �   CREATE TABLE public.auth_group_permissions (
    id integer NOT NULL,
    group_id integer NOT NULL,
    permission_id integer NOT NULL
);
 *   DROP TABLE public.auth_group_permissions;
       public         postgres    false    3            �            1259    45305    auth_group_permissions_id_seq    SEQUENCE     �   CREATE SEQUENCE public.auth_group_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.auth_group_permissions_id_seq;
       public       postgres    false    3    205            3           0    0    auth_group_permissions_id_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.auth_group_permissions_id_seq OWNED BY public.auth_group_permissions.id;
            public       postgres    false    204            �            1259    45289    auth_permission    TABLE     �   CREATE TABLE public.auth_permission (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    content_type_id integer NOT NULL,
    codename character varying(100) NOT NULL
);
 #   DROP TABLE public.auth_permission;
       public         postgres    false    3            �            1259    45287    auth_permission_id_seq    SEQUENCE     �   CREATE SEQUENCE public.auth_permission_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.auth_permission_id_seq;
       public       postgres    false    201    3            4           0    0    auth_permission_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.auth_permission_id_seq OWNED BY public.auth_permission.id;
            public       postgres    false    200            �            1259    45315 	   auth_user    TABLE     �  CREATE TABLE public.auth_user (
    id integer NOT NULL,
    password character varying(128) NOT NULL,
    last_login timestamp with time zone,
    is_superuser boolean NOT NULL,
    username character varying(150) NOT NULL,
    first_name character varying(30) NOT NULL,
    last_name character varying(150) NOT NULL,
    email character varying(254) NOT NULL,
    is_staff boolean NOT NULL,
    is_active boolean NOT NULL,
    date_joined timestamp with time zone NOT NULL
);
    DROP TABLE public.auth_user;
       public         postgres    false    3            �            1259    45325    auth_user_groups    TABLE        CREATE TABLE public.auth_user_groups (
    id integer NOT NULL,
    user_id integer NOT NULL,
    group_id integer NOT NULL
);
 $   DROP TABLE public.auth_user_groups;
       public         postgres    false    3            �            1259    45323    auth_user_groups_id_seq    SEQUENCE     �   CREATE SEQUENCE public.auth_user_groups_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.auth_user_groups_id_seq;
       public       postgres    false    3    209            5           0    0    auth_user_groups_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.auth_user_groups_id_seq OWNED BY public.auth_user_groups.id;
            public       postgres    false    208            �            1259    45313    auth_user_id_seq    SEQUENCE     �   CREATE SEQUENCE public.auth_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.auth_user_id_seq;
       public       postgres    false    3    207            6           0    0    auth_user_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.auth_user_id_seq OWNED BY public.auth_user.id;
            public       postgres    false    206            �            1259    45333    auth_user_user_permissions    TABLE     �   CREATE TABLE public.auth_user_user_permissions (
    id integer NOT NULL,
    user_id integer NOT NULL,
    permission_id integer NOT NULL
);
 .   DROP TABLE public.auth_user_user_permissions;
       public         postgres    false    3            �            1259    45331 !   auth_user_user_permissions_id_seq    SEQUENCE     �   CREATE SEQUENCE public.auth_user_user_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 8   DROP SEQUENCE public.auth_user_user_permissions_id_seq;
       public       postgres    false    211    3            7           0    0 !   auth_user_user_permissions_id_seq    SEQUENCE OWNED BY     g   ALTER SEQUENCE public.auth_user_user_permissions_id_seq OWNED BY public.auth_user_user_permissions.id;
            public       postgres    false    210            �            1259    45393    django_admin_log    TABLE     �  CREATE TABLE public.django_admin_log (
    id integer NOT NULL,
    action_time timestamp with time zone NOT NULL,
    object_id text,
    object_repr character varying(200) NOT NULL,
    action_flag smallint NOT NULL,
    change_message text NOT NULL,
    content_type_id integer,
    user_id integer NOT NULL,
    CONSTRAINT django_admin_log_action_flag_check CHECK ((action_flag >= 0))
);
 $   DROP TABLE public.django_admin_log;
       public         postgres    false    3            �            1259    45391    django_admin_log_id_seq    SEQUENCE     �   CREATE SEQUENCE public.django_admin_log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.django_admin_log_id_seq;
       public       postgres    false    213    3            8           0    0    django_admin_log_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.django_admin_log_id_seq OWNED BY public.django_admin_log.id;
            public       postgres    false    212            �            1259    45279    django_content_type    TABLE     �   CREATE TABLE public.django_content_type (
    id integer NOT NULL,
    app_label character varying(100) NOT NULL,
    model character varying(100) NOT NULL
);
 '   DROP TABLE public.django_content_type;
       public         postgres    false    3            �            1259    45277    django_content_type_id_seq    SEQUENCE     �   CREATE SEQUENCE public.django_content_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.django_content_type_id_seq;
       public       postgres    false    3    199            9           0    0    django_content_type_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.django_content_type_id_seq OWNED BY public.django_content_type.id;
            public       postgres    false    198            �            1259    45268    django_migrations    TABLE     �   CREATE TABLE public.django_migrations (
    id integer NOT NULL,
    app character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    applied timestamp with time zone NOT NULL
);
 %   DROP TABLE public.django_migrations;
       public         postgres    false    3            �            1259    45266    django_migrations_id_seq    SEQUENCE     �   CREATE SEQUENCE public.django_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.django_migrations_id_seq;
       public       postgres    false    197    3            :           0    0    django_migrations_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.django_migrations_id_seq OWNED BY public.django_migrations.id;
            public       postgres    false    196            �            1259    45424    django_session    TABLE     �   CREATE TABLE public.django_session (
    session_key character varying(40) NOT NULL,
    session_data text NOT NULL,
    expire_date timestamp with time zone NOT NULL
);
 "   DROP TABLE public.django_session;
       public         postgres    false    3            �            1259    54207    mainapp_allcounters    TABLE     �   CREATE TABLE public.mainapp_allcounters (
    id integer NOT NULL,
    name character varying(150) NOT NULL,
    counter integer
);
 '   DROP TABLE public.mainapp_allcounters;
       public         postgres    false    3            �            1259    54205    mainapp_allcounters_id_seq    SEQUENCE     �   CREATE SEQUENCE public.mainapp_allcounters_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.mainapp_allcounters_id_seq;
       public       postgres    false    3    234            ;           0    0    mainapp_allcounters_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.mainapp_allcounters_id_seq OWNED BY public.mainapp_allcounters.id;
            public       postgres    false    233            �            1259    45463    mainapp_customerprofile    TABLE     �  CREATE TABLE public.mainapp_customerprofile (
    id integer NOT NULL,
    address text NOT NULL,
    pincode integer NOT NULL,
    city character varying(50) NOT NULL,
    phone character varying(128) NOT NULL,
    user_id integer NOT NULL,
    distributer character varying(500) NOT NULL,
    state character varying(50) NOT NULL,
    gst character varying(500),
    stateid integer,
    billingaddress text NOT NULL,
    billingcity character varying(50) NOT NULL,
    billingpincode integer NOT NULL,
    billingstate character varying(50) NOT NULL,
    billingcountry character varying(50) NOT NULL,
    country character varying(50) NOT NULL,
    customername character varying(100) NOT NULL
);
 +   DROP TABLE public.mainapp_customerprofile;
       public         postgres    false    3            �            1259    45461    mainapp_customerprofile_id_seq    SEQUENCE     �   CREATE SEQUENCE public.mainapp_customerprofile_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public.mainapp_customerprofile_id_seq;
       public       postgres    false    3    218            <           0    0    mainapp_customerprofile_id_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public.mainapp_customerprofile_id_seq OWNED BY public.mainapp_customerprofile.id;
            public       postgres    false    217            �            1259    53846    mainapp_gsttable    TABLE     �   CREATE TABLE public.mainapp_gsttable (
    id integer NOT NULL,
    state character varying(150) NOT NULL,
    igst boolean NOT NULL,
    cgst boolean NOT NULL,
    sgst boolean NOT NULL
);
 $   DROP TABLE public.mainapp_gsttable;
       public         postgres    false    3            �            1259    53844    mainapp_gsttable_id_seq    SEQUENCE     �   CREATE SEQUENCE public.mainapp_gsttable_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.mainapp_gsttable_id_seq;
       public       postgres    false    224    3            =           0    0    mainapp_gsttable_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.mainapp_gsttable_id_seq OWNED BY public.mainapp_gsttable.id;
            public       postgres    false    223            �            1259    54163    mainapp_invoicestorage    TABLE     �   CREATE TABLE public.mainapp_invoicestorage (
    id integer NOT NULL,
    invoiceid integer,
    creatorid integer,
    deletorid integer
);
 *   DROP TABLE public.mainapp_invoicestorage;
       public         postgres    false    3            �            1259    54161    mainapp_invoicestorage_id_seq    SEQUENCE     �   CREATE SEQUENCE public.mainapp_invoicestorage_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.mainapp_invoicestorage_id_seq;
       public       postgres    false    3    228            >           0    0    mainapp_invoicestorage_id_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.mainapp_invoicestorage_id_seq OWNED BY public.mainapp_invoicestorage.id;
            public       postgres    false    227            �            1259    45498    mainapp_product    TABLE     �   CREATE TABLE public.mainapp_product (
    id integer NOT NULL,
    name character varying(150) NOT NULL,
    description text NOT NULL,
    price integer NOT NULL,
    "HSN" integer NOT NULL,
    tax integer NOT NULL
);
 #   DROP TABLE public.mainapp_product;
       public         postgres    false    3            �            1259    45496    mainapp_products_id_seq    SEQUENCE     �   CREATE SEQUENCE public.mainapp_products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.mainapp_products_id_seq;
       public       postgres    false    220    3            ?           0    0    mainapp_products_id_seq    SEQUENCE OWNED BY     R   ALTER SEQUENCE public.mainapp_products_id_seq OWNED BY public.mainapp_product.id;
            public       postgres    false    219            �            1259    45436    mainapp_profile    TABLE     y  CREATE TABLE public.mainapp_profile (
    id integer NOT NULL,
    address text NOT NULL,
    pincode integer,
    telephone character varying(128) NOT NULL,
    user_id integer NOT NULL,
    businessgeography character varying(50) NOT NULL,
    cinno character varying(20),
    contactparticulars character varying(100) NOT NULL,
    currentproducts text NOT NULL,
    currentstaffstrength integer,
    customershandledsofar text NOT NULL,
    gstno character varying(20) NOT NULL,
    legalstatus character varying(100) NOT NULL,
    marketsegment character varying(50) NOT NULL,
    mobile character varying(128) NOT NULL,
    nameofcontact character varying(100) NOT NULL,
    panno character varying(20) NOT NULL,
    parternshipcat character varying(50) NOT NULL,
    salersturnover integer,
    shopactno character varying(20) NOT NULL,
    image character varying(100) NOT NULL
);
 #   DROP TABLE public.mainapp_profile;
       public         postgres    false    3            �            1259    45434    mainapp_profile_id_seq    SEQUENCE     �   CREATE SEQUENCE public.mainapp_profile_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.mainapp_profile_id_seq;
       public       postgres    false    3    216            @           0    0    mainapp_profile_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.mainapp_profile_id_seq OWNED BY public.mainapp_profile.id;
            public       postgres    false    215            �            1259    54188    mainapp_quotationinvoice    TABLE       CREATE TABLE public.mainapp_quotationinvoice (
    id integer NOT NULL,
    quotationid integer NOT NULL,
    customerid integer NOT NULL,
    creatorid integer,
    updatorid integer,
    customername character varying(500) NOT NULL,
    customeraddress character varying(500),
    customerpincode character varying(500),
    customerstate character varying(500),
    customergst character varying(500),
    customerplaceofsupply character varying(500),
    quotationdate date NOT NULL,
    terms character varying(500) NOT NULL,
    exiprydate date NOT NULL,
    quotationnumber integer NOT NULL,
    items text NOT NULL,
    subtotalamount double precision,
    taxamount double precision,
    adjustmentamount double precision,
    finalamount double precision,
    signature boolean
);
 ,   DROP TABLE public.mainapp_quotationinvoice;
       public         postgres    false    3            �            1259    54186    mainapp_quotationinvoice_id_seq    SEQUENCE     �   CREATE SEQUENCE public.mainapp_quotationinvoice_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public.mainapp_quotationinvoice_id_seq;
       public       postgres    false    3    230            A           0    0    mainapp_quotationinvoice_id_seq    SEQUENCE OWNED BY     c   ALTER SEQUENCE public.mainapp_quotationinvoice_id_seq OWNED BY public.mainapp_quotationinvoice.id;
            public       postgres    false    229            �            1259    54199    mainapp_quotationstorage    TABLE     �   CREATE TABLE public.mainapp_quotationstorage (
    id integer NOT NULL,
    quotationid integer,
    creatorid integer,
    deletorid integer
);
 ,   DROP TABLE public.mainapp_quotationstorage;
       public         postgres    false    3            �            1259    54197    mainapp_quotationstorage_id_seq    SEQUENCE     �   CREATE SEQUENCE public.mainapp_quotationstorage_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public.mainapp_quotationstorage_id_seq;
       public       postgres    false    232    3            B           0    0    mainapp_quotationstorage_id_seq    SEQUENCE OWNED BY     c   ALTER SEQUENCE public.mainapp_quotationstorage_id_seq OWNED BY public.mainapp_quotationstorage.id;
            public       postgres    false    231            �            1259    45654    mainapp_serialnumbercounter    TABLE     k   CREATE TABLE public.mainapp_serialnumbercounter (
    id integer NOT NULL,
    counter integer NOT NULL
);
 /   DROP TABLE public.mainapp_serialnumbercounter;
       public         postgres    false    3            �            1259    45652 "   mainapp_serialnumbercounter_id_seq    SEQUENCE     �   CREATE SEQUENCE public.mainapp_serialnumbercounter_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 9   DROP SEQUENCE public.mainapp_serialnumbercounter_id_seq;
       public       postgres    false    222    3            C           0    0 "   mainapp_serialnumbercounter_id_seq    SEQUENCE OWNED BY     i   ALTER SEQUENCE public.mainapp_serialnumbercounter_id_seq OWNED BY public.mainapp_serialnumbercounter.id;
            public       postgres    false    221            �            1259    53854    mainapp_taxinvoice    TABLE     S  CREATE TABLE public.mainapp_taxinvoice (
    id integer NOT NULL,
    invoiceid integer NOT NULL,
    customerid integer NOT NULL,
    customername character varying(500) NOT NULL,
    invoicedate date,
    terms character varying(500) NOT NULL,
    duedate date,
    po character varying(500) NOT NULL,
    items text NOT NULL,
    adjustmentamount double precision,
    finalamount double precision,
    subtotalamount double precision,
    taxamount double precision,
    signature boolean,
    creatorid integer,
    updatorid integer,
    "shippingState" character varying(500) NOT NULL
);
 &   DROP TABLE public.mainapp_taxinvoice;
       public         postgres    false    3            �            1259    53852    mainapp_taxinvoice_id_seq    SEQUENCE     �   CREATE SEQUENCE public.mainapp_taxinvoice_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.mainapp_taxinvoice_id_seq;
       public       postgres    false    226    3            D           0    0    mainapp_taxinvoice_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.mainapp_taxinvoice_id_seq OWNED BY public.mainapp_taxinvoice.id;
            public       postgres    false    225            '           2604    45300    auth_group id    DEFAULT     n   ALTER TABLE ONLY public.auth_group ALTER COLUMN id SET DEFAULT nextval('public.auth_group_id_seq'::regclass);
 <   ALTER TABLE public.auth_group ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    202    203    203            (           2604    45310    auth_group_permissions id    DEFAULT     �   ALTER TABLE ONLY public.auth_group_permissions ALTER COLUMN id SET DEFAULT nextval('public.auth_group_permissions_id_seq'::regclass);
 H   ALTER TABLE public.auth_group_permissions ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    204    205    205            &           2604    45292    auth_permission id    DEFAULT     x   ALTER TABLE ONLY public.auth_permission ALTER COLUMN id SET DEFAULT nextval('public.auth_permission_id_seq'::regclass);
 A   ALTER TABLE public.auth_permission ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    201    200    201            )           2604    45318    auth_user id    DEFAULT     l   ALTER TABLE ONLY public.auth_user ALTER COLUMN id SET DEFAULT nextval('public.auth_user_id_seq'::regclass);
 ;   ALTER TABLE public.auth_user ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    207    206    207            *           2604    45328    auth_user_groups id    DEFAULT     z   ALTER TABLE ONLY public.auth_user_groups ALTER COLUMN id SET DEFAULT nextval('public.auth_user_groups_id_seq'::regclass);
 B   ALTER TABLE public.auth_user_groups ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    209    208    209            +           2604    45336    auth_user_user_permissions id    DEFAULT     �   ALTER TABLE ONLY public.auth_user_user_permissions ALTER COLUMN id SET DEFAULT nextval('public.auth_user_user_permissions_id_seq'::regclass);
 L   ALTER TABLE public.auth_user_user_permissions ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    210    211    211            ,           2604    45396    django_admin_log id    DEFAULT     z   ALTER TABLE ONLY public.django_admin_log ALTER COLUMN id SET DEFAULT nextval('public.django_admin_log_id_seq'::regclass);
 B   ALTER TABLE public.django_admin_log ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    213    212    213            %           2604    45282    django_content_type id    DEFAULT     �   ALTER TABLE ONLY public.django_content_type ALTER COLUMN id SET DEFAULT nextval('public.django_content_type_id_seq'::regclass);
 E   ALTER TABLE public.django_content_type ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    199    198    199            $           2604    45271    django_migrations id    DEFAULT     |   ALTER TABLE ONLY public.django_migrations ALTER COLUMN id SET DEFAULT nextval('public.django_migrations_id_seq'::regclass);
 C   ALTER TABLE public.django_migrations ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    196    197    197            7           2604    54210    mainapp_allcounters id    DEFAULT     �   ALTER TABLE ONLY public.mainapp_allcounters ALTER COLUMN id SET DEFAULT nextval('public.mainapp_allcounters_id_seq'::regclass);
 E   ALTER TABLE public.mainapp_allcounters ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    234    233    234            /           2604    45466    mainapp_customerprofile id    DEFAULT     �   ALTER TABLE ONLY public.mainapp_customerprofile ALTER COLUMN id SET DEFAULT nextval('public.mainapp_customerprofile_id_seq'::regclass);
 I   ALTER TABLE public.mainapp_customerprofile ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    218    217    218            2           2604    53849    mainapp_gsttable id    DEFAULT     z   ALTER TABLE ONLY public.mainapp_gsttable ALTER COLUMN id SET DEFAULT nextval('public.mainapp_gsttable_id_seq'::regclass);
 B   ALTER TABLE public.mainapp_gsttable ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    223    224    224            4           2604    54166    mainapp_invoicestorage id    DEFAULT     �   ALTER TABLE ONLY public.mainapp_invoicestorage ALTER COLUMN id SET DEFAULT nextval('public.mainapp_invoicestorage_id_seq'::regclass);
 H   ALTER TABLE public.mainapp_invoicestorage ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    227    228    228            0           2604    45501    mainapp_product id    DEFAULT     y   ALTER TABLE ONLY public.mainapp_product ALTER COLUMN id SET DEFAULT nextval('public.mainapp_products_id_seq'::regclass);
 A   ALTER TABLE public.mainapp_product ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    219    220    220            .           2604    45439    mainapp_profile id    DEFAULT     x   ALTER TABLE ONLY public.mainapp_profile ALTER COLUMN id SET DEFAULT nextval('public.mainapp_profile_id_seq'::regclass);
 A   ALTER TABLE public.mainapp_profile ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    215    216    216            5           2604    54191    mainapp_quotationinvoice id    DEFAULT     �   ALTER TABLE ONLY public.mainapp_quotationinvoice ALTER COLUMN id SET DEFAULT nextval('public.mainapp_quotationinvoice_id_seq'::regclass);
 J   ALTER TABLE public.mainapp_quotationinvoice ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    229    230    230            6           2604    54202    mainapp_quotationstorage id    DEFAULT     �   ALTER TABLE ONLY public.mainapp_quotationstorage ALTER COLUMN id SET DEFAULT nextval('public.mainapp_quotationstorage_id_seq'::regclass);
 J   ALTER TABLE public.mainapp_quotationstorage ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    231    232    232            1           2604    45657    mainapp_serialnumbercounter id    DEFAULT     �   ALTER TABLE ONLY public.mainapp_serialnumbercounter ALTER COLUMN id SET DEFAULT nextval('public.mainapp_serialnumbercounter_id_seq'::regclass);
 M   ALTER TABLE public.mainapp_serialnumbercounter ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    221    222    222            3           2604    53857    mainapp_taxinvoice id    DEFAULT     ~   ALTER TABLE ONLY public.mainapp_taxinvoice ALTER COLUMN id SET DEFAULT nextval('public.mainapp_taxinvoice_id_seq'::regclass);
 D   ALTER TABLE public.mainapp_taxinvoice ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    225    226    226            
          0    45297 
   auth_group 
   TABLE DATA               .   COPY public.auth_group (id, name) FROM stdin;
    public       postgres    false    203   w�                 0    45307    auth_group_permissions 
   TABLE DATA               M   COPY public.auth_group_permissions (id, group_id, permission_id) FROM stdin;
    public       postgres    false    205   ��                 0    45289    auth_permission 
   TABLE DATA               N   COPY public.auth_permission (id, name, content_type_id, codename) FROM stdin;
    public       postgres    false    201   ��                 0    45315 	   auth_user 
   TABLE DATA               �   COPY public.auth_user (id, password, last_login, is_superuser, username, first_name, last_name, email, is_staff, is_active, date_joined) FROM stdin;
    public       postgres    false    207   \�                 0    45325    auth_user_groups 
   TABLE DATA               A   COPY public.auth_user_groups (id, user_id, group_id) FROM stdin;
    public       postgres    false    209   �                 0    45333    auth_user_user_permissions 
   TABLE DATA               P   COPY public.auth_user_user_permissions (id, user_id, permission_id) FROM stdin;
    public       postgres    false    211   6�                 0    45393    django_admin_log 
   TABLE DATA               �   COPY public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) FROM stdin;
    public       postgres    false    213   S�                 0    45279    django_content_type 
   TABLE DATA               C   COPY public.django_content_type (id, app_label, model) FROM stdin;
    public       postgres    false    199   ��                 0    45268    django_migrations 
   TABLE DATA               C   COPY public.django_migrations (id, app, name, applied) FROM stdin;
    public       postgres    false    197   K�                 0    45424    django_session 
   TABLE DATA               P   COPY public.django_session (session_key, session_data, expire_date) FROM stdin;
    public       postgres    false    214   @�       )          0    54207    mainapp_allcounters 
   TABLE DATA               @   COPY public.mainapp_allcounters (id, name, counter) FROM stdin;
    public       postgres    false    234   �                 0    45463    mainapp_customerprofile 
   TABLE DATA               �   COPY public.mainapp_customerprofile (id, address, pincode, city, phone, user_id, distributer, state, gst, stateid, billingaddress, billingcity, billingpincode, billingstate, billingcountry, country, customername) FROM stdin;
    public       postgres    false    218   �                 0    53846    mainapp_gsttable 
   TABLE DATA               G   COPY public.mainapp_gsttable (id, state, igst, cgst, sgst) FROM stdin;
    public       postgres    false    224   h      #          0    54163    mainapp_invoicestorage 
   TABLE DATA               U   COPY public.mainapp_invoicestorage (id, invoiceid, creatorid, deletorid) FROM stdin;
    public       postgres    false    228   �                0    45498    mainapp_product 
   TABLE DATA               S   COPY public.mainapp_product (id, name, description, price, "HSN", tax) FROM stdin;
    public       postgres    false    220   	                0    45436    mainapp_profile 
   TABLE DATA               2  COPY public.mainapp_profile (id, address, pincode, telephone, user_id, businessgeography, cinno, contactparticulars, currentproducts, currentstaffstrength, customershandledsofar, gstno, legalstatus, marketsegment, mobile, nameofcontact, panno, parternshipcat, salersturnover, shopactno, image) FROM stdin;
    public       postgres    false    216   �      %          0    54188    mainapp_quotationinvoice 
   TABLE DATA               G  COPY public.mainapp_quotationinvoice (id, quotationid, customerid, creatorid, updatorid, customername, customeraddress, customerpincode, customerstate, customergst, customerplaceofsupply, quotationdate, terms, exiprydate, quotationnumber, items, subtotalamount, taxamount, adjustmentamount, finalamount, signature) FROM stdin;
    public       postgres    false    230   �      '          0    54199    mainapp_quotationstorage 
   TABLE DATA               Y   COPY public.mainapp_quotationstorage (id, quotationid, creatorid, deletorid) FROM stdin;
    public       postgres    false    232   �                0    45654    mainapp_serialnumbercounter 
   TABLE DATA               B   COPY public.mainapp_serialnumbercounter (id, counter) FROM stdin;
    public       postgres    false    222   �      !          0    53854    mainapp_taxinvoice 
   TABLE DATA               �   COPY public.mainapp_taxinvoice (id, invoiceid, customerid, customername, invoicedate, terms, duedate, po, items, adjustmentamount, finalamount, subtotalamount, taxamount, signature, creatorid, updatorid, "shippingState") FROM stdin;
    public       postgres    false    226   �      E           0    0    auth_group_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.auth_group_id_seq', 1, false);
            public       postgres    false    202            F           0    0    auth_group_permissions_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.auth_group_permissions_id_seq', 1, false);
            public       postgres    false    204            G           0    0    auth_permission_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.auth_permission_id_seq', 64, true);
            public       postgres    false    200            H           0    0    auth_user_groups_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.auth_user_groups_id_seq', 1, false);
            public       postgres    false    208            I           0    0    auth_user_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.auth_user_id_seq', 7, true);
            public       postgres    false    206            J           0    0 !   auth_user_user_permissions_id_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public.auth_user_user_permissions_id_seq', 1, false);
            public       postgres    false    210            K           0    0    django_admin_log_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.django_admin_log_id_seq', 122, true);
            public       postgres    false    212            L           0    0    django_content_type_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.django_content_type_id_seq', 16, true);
            public       postgres    false    198            M           0    0    django_migrations_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.django_migrations_id_seq', 70, true);
            public       postgres    false    196            N           0    0    mainapp_allcounters_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.mainapp_allcounters_id_seq', 1, true);
            public       postgres    false    233            O           0    0    mainapp_customerprofile_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.mainapp_customerprofile_id_seq', 5, true);
            public       postgres    false    217            P           0    0    mainapp_gsttable_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.mainapp_gsttable_id_seq', 36, true);
            public       postgres    false    223            Q           0    0    mainapp_invoicestorage_id_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.mainapp_invoicestorage_id_seq', 1, true);
            public       postgres    false    227            R           0    0    mainapp_products_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.mainapp_products_id_seq', 4, true);
            public       postgres    false    219            S           0    0    mainapp_profile_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.mainapp_profile_id_seq', 2, true);
            public       postgres    false    215            T           0    0    mainapp_quotationinvoice_id_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public.mainapp_quotationinvoice_id_seq', 1, false);
            public       postgres    false    229            U           0    0    mainapp_quotationstorage_id_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public.mainapp_quotationstorage_id_seq', 1, false);
            public       postgres    false    231            V           0    0 "   mainapp_serialnumbercounter_id_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public.mainapp_serialnumbercounter_id_seq', 2, true);
            public       postgres    false    221            W           0    0    mainapp_taxinvoice_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.mainapp_taxinvoice_id_seq', 26, true);
            public       postgres    false    225            E           2606    45422    auth_group auth_group_name_key 
   CONSTRAINT     Y   ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_name_key UNIQUE (name);
 H   ALTER TABLE ONLY public.auth_group DROP CONSTRAINT auth_group_name_key;
       public         postgres    false    203            J           2606    45359 R   auth_group_permissions auth_group_permissions_group_id_permission_id_0cd325b0_uniq 
   CONSTRAINT     �   ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_permission_id_0cd325b0_uniq UNIQUE (group_id, permission_id);
 |   ALTER TABLE ONLY public.auth_group_permissions DROP CONSTRAINT auth_group_permissions_group_id_permission_id_0cd325b0_uniq;
       public         postgres    false    205    205            M           2606    45312 2   auth_group_permissions auth_group_permissions_pkey 
   CONSTRAINT     p   ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_pkey PRIMARY KEY (id);
 \   ALTER TABLE ONLY public.auth_group_permissions DROP CONSTRAINT auth_group_permissions_pkey;
       public         postgres    false    205            G           2606    45302    auth_group auth_group_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.auth_group DROP CONSTRAINT auth_group_pkey;
       public         postgres    false    203            @           2606    45345 F   auth_permission auth_permission_content_type_id_codename_01ab375a_uniq 
   CONSTRAINT     �   ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_codename_01ab375a_uniq UNIQUE (content_type_id, codename);
 p   ALTER TABLE ONLY public.auth_permission DROP CONSTRAINT auth_permission_content_type_id_codename_01ab375a_uniq;
       public         postgres    false    201    201            B           2606    45294 $   auth_permission auth_permission_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.auth_permission DROP CONSTRAINT auth_permission_pkey;
       public         postgres    false    201            U           2606    45330 &   auth_user_groups auth_user_groups_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.auth_user_groups DROP CONSTRAINT auth_user_groups_pkey;
       public         postgres    false    209            X           2606    45374 @   auth_user_groups auth_user_groups_user_id_group_id_94350c0c_uniq 
   CONSTRAINT     �   ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_user_id_group_id_94350c0c_uniq UNIQUE (user_id, group_id);
 j   ALTER TABLE ONLY public.auth_user_groups DROP CONSTRAINT auth_user_groups_user_id_group_id_94350c0c_uniq;
       public         postgres    false    209    209            O           2606    45320    auth_user auth_user_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.auth_user
    ADD CONSTRAINT auth_user_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.auth_user DROP CONSTRAINT auth_user_pkey;
       public         postgres    false    207            [           2606    45338 :   auth_user_user_permissions auth_user_user_permissions_pkey 
   CONSTRAINT     x   ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_pkey PRIMARY KEY (id);
 d   ALTER TABLE ONLY public.auth_user_user_permissions DROP CONSTRAINT auth_user_user_permissions_pkey;
       public         postgres    false    211            ^           2606    45388 Y   auth_user_user_permissions auth_user_user_permissions_user_id_permission_id_14a6b632_uniq 
   CONSTRAINT     �   ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_user_id_permission_id_14a6b632_uniq UNIQUE (user_id, permission_id);
 �   ALTER TABLE ONLY public.auth_user_user_permissions DROP CONSTRAINT auth_user_user_permissions_user_id_permission_id_14a6b632_uniq;
       public         postgres    false    211    211            R           2606    45416     auth_user auth_user_username_key 
   CONSTRAINT     _   ALTER TABLE ONLY public.auth_user
    ADD CONSTRAINT auth_user_username_key UNIQUE (username);
 J   ALTER TABLE ONLY public.auth_user DROP CONSTRAINT auth_user_username_key;
       public         postgres    false    207            a           2606    45402 &   django_admin_log django_admin_log_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.django_admin_log DROP CONSTRAINT django_admin_log_pkey;
       public         postgres    false    213            ;           2606    45286 E   django_content_type django_content_type_app_label_model_76bd3d3b_uniq 
   CONSTRAINT     �   ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_app_label_model_76bd3d3b_uniq UNIQUE (app_label, model);
 o   ALTER TABLE ONLY public.django_content_type DROP CONSTRAINT django_content_type_app_label_model_76bd3d3b_uniq;
       public         postgres    false    199    199            =           2606    45284 ,   django_content_type django_content_type_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_pkey PRIMARY KEY (id);
 V   ALTER TABLE ONLY public.django_content_type DROP CONSTRAINT django_content_type_pkey;
       public         postgres    false    199            9           2606    45276 (   django_migrations django_migrations_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.django_migrations
    ADD CONSTRAINT django_migrations_pkey PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.django_migrations DROP CONSTRAINT django_migrations_pkey;
       public         postgres    false    197            e           2606    45431 "   django_session django_session_pkey 
   CONSTRAINT     i   ALTER TABLE ONLY public.django_session
    ADD CONSTRAINT django_session_pkey PRIMARY KEY (session_key);
 L   ALTER TABLE ONLY public.django_session DROP CONSTRAINT django_session_pkey;
       public         postgres    false    214            ~           2606    54212 ,   mainapp_allcounters mainapp_allcounters_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.mainapp_allcounters
    ADD CONSTRAINT mainapp_allcounters_pkey PRIMARY KEY (id);
 V   ALTER TABLE ONLY public.mainapp_allcounters DROP CONSTRAINT mainapp_allcounters_pkey;
       public         postgres    false    234            l           2606    45471 4   mainapp_customerprofile mainapp_customerprofile_pkey 
   CONSTRAINT     r   ALTER TABLE ONLY public.mainapp_customerprofile
    ADD CONSTRAINT mainapp_customerprofile_pkey PRIMARY KEY (id);
 ^   ALTER TABLE ONLY public.mainapp_customerprofile DROP CONSTRAINT mainapp_customerprofile_pkey;
       public         postgres    false    218            n           2606    45473 ;   mainapp_customerprofile mainapp_customerprofile_user_id_key 
   CONSTRAINT     y   ALTER TABLE ONLY public.mainapp_customerprofile
    ADD CONSTRAINT mainapp_customerprofile_user_id_key UNIQUE (user_id);
 e   ALTER TABLE ONLY public.mainapp_customerprofile DROP CONSTRAINT mainapp_customerprofile_user_id_key;
       public         postgres    false    218            t           2606    53851 &   mainapp_gsttable mainapp_gsttable_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.mainapp_gsttable
    ADD CONSTRAINT mainapp_gsttable_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.mainapp_gsttable DROP CONSTRAINT mainapp_gsttable_pkey;
       public         postgres    false    224            x           2606    54168 2   mainapp_invoicestorage mainapp_invoicestorage_pkey 
   CONSTRAINT     p   ALTER TABLE ONLY public.mainapp_invoicestorage
    ADD CONSTRAINT mainapp_invoicestorage_pkey PRIMARY KEY (id);
 \   ALTER TABLE ONLY public.mainapp_invoicestorage DROP CONSTRAINT mainapp_invoicestorage_pkey;
       public         postgres    false    228            p           2606    45506 %   mainapp_product mainapp_products_pkey 
   CONSTRAINT     c   ALTER TABLE ONLY public.mainapp_product
    ADD CONSTRAINT mainapp_products_pkey PRIMARY KEY (id);
 O   ALTER TABLE ONLY public.mainapp_product DROP CONSTRAINT mainapp_products_pkey;
       public         postgres    false    220            h           2606    45444 $   mainapp_profile mainapp_profile_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.mainapp_profile
    ADD CONSTRAINT mainapp_profile_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.mainapp_profile DROP CONSTRAINT mainapp_profile_pkey;
       public         postgres    false    216            j           2606    45446 +   mainapp_profile mainapp_profile_user_id_key 
   CONSTRAINT     i   ALTER TABLE ONLY public.mainapp_profile
    ADD CONSTRAINT mainapp_profile_user_id_key UNIQUE (user_id);
 U   ALTER TABLE ONLY public.mainapp_profile DROP CONSTRAINT mainapp_profile_user_id_key;
       public         postgres    false    216            z           2606    54196 6   mainapp_quotationinvoice mainapp_quotationinvoice_pkey 
   CONSTRAINT     t   ALTER TABLE ONLY public.mainapp_quotationinvoice
    ADD CONSTRAINT mainapp_quotationinvoice_pkey PRIMARY KEY (id);
 `   ALTER TABLE ONLY public.mainapp_quotationinvoice DROP CONSTRAINT mainapp_quotationinvoice_pkey;
       public         postgres    false    230            |           2606    54204 6   mainapp_quotationstorage mainapp_quotationstorage_pkey 
   CONSTRAINT     t   ALTER TABLE ONLY public.mainapp_quotationstorage
    ADD CONSTRAINT mainapp_quotationstorage_pkey PRIMARY KEY (id);
 `   ALTER TABLE ONLY public.mainapp_quotationstorage DROP CONSTRAINT mainapp_quotationstorage_pkey;
       public         postgres    false    232            r           2606    45659 <   mainapp_serialnumbercounter mainapp_serialnumbercounter_pkey 
   CONSTRAINT     z   ALTER TABLE ONLY public.mainapp_serialnumbercounter
    ADD CONSTRAINT mainapp_serialnumbercounter_pkey PRIMARY KEY (id);
 f   ALTER TABLE ONLY public.mainapp_serialnumbercounter DROP CONSTRAINT mainapp_serialnumbercounter_pkey;
       public         postgres    false    222            v           2606    53862 *   mainapp_taxinvoice mainapp_taxinvoice_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.mainapp_taxinvoice
    ADD CONSTRAINT mainapp_taxinvoice_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public.mainapp_taxinvoice DROP CONSTRAINT mainapp_taxinvoice_pkey;
       public         postgres    false    226            C           1259    45423    auth_group_name_a6ea08ec_like    INDEX     h   CREATE INDEX auth_group_name_a6ea08ec_like ON public.auth_group USING btree (name varchar_pattern_ops);
 1   DROP INDEX public.auth_group_name_a6ea08ec_like;
       public         postgres    false    203            H           1259    45360 (   auth_group_permissions_group_id_b120cbf9    INDEX     o   CREATE INDEX auth_group_permissions_group_id_b120cbf9 ON public.auth_group_permissions USING btree (group_id);
 <   DROP INDEX public.auth_group_permissions_group_id_b120cbf9;
       public         postgres    false    205            K           1259    45361 -   auth_group_permissions_permission_id_84c5c92e    INDEX     y   CREATE INDEX auth_group_permissions_permission_id_84c5c92e ON public.auth_group_permissions USING btree (permission_id);
 A   DROP INDEX public.auth_group_permissions_permission_id_84c5c92e;
       public         postgres    false    205            >           1259    45346 (   auth_permission_content_type_id_2f476e4b    INDEX     o   CREATE INDEX auth_permission_content_type_id_2f476e4b ON public.auth_permission USING btree (content_type_id);
 <   DROP INDEX public.auth_permission_content_type_id_2f476e4b;
       public         postgres    false    201            S           1259    45376 "   auth_user_groups_group_id_97559544    INDEX     c   CREATE INDEX auth_user_groups_group_id_97559544 ON public.auth_user_groups USING btree (group_id);
 6   DROP INDEX public.auth_user_groups_group_id_97559544;
       public         postgres    false    209            V           1259    45375 !   auth_user_groups_user_id_6a12ed8b    INDEX     a   CREATE INDEX auth_user_groups_user_id_6a12ed8b ON public.auth_user_groups USING btree (user_id);
 5   DROP INDEX public.auth_user_groups_user_id_6a12ed8b;
       public         postgres    false    209            Y           1259    45390 1   auth_user_user_permissions_permission_id_1fbb5f2c    INDEX     �   CREATE INDEX auth_user_user_permissions_permission_id_1fbb5f2c ON public.auth_user_user_permissions USING btree (permission_id);
 E   DROP INDEX public.auth_user_user_permissions_permission_id_1fbb5f2c;
       public         postgres    false    211            \           1259    45389 +   auth_user_user_permissions_user_id_a95ead1b    INDEX     u   CREATE INDEX auth_user_user_permissions_user_id_a95ead1b ON public.auth_user_user_permissions USING btree (user_id);
 ?   DROP INDEX public.auth_user_user_permissions_user_id_a95ead1b;
       public         postgres    false    211            P           1259    45417     auth_user_username_6821ab7c_like    INDEX     n   CREATE INDEX auth_user_username_6821ab7c_like ON public.auth_user USING btree (username varchar_pattern_ops);
 4   DROP INDEX public.auth_user_username_6821ab7c_like;
       public         postgres    false    207            _           1259    45413 )   django_admin_log_content_type_id_c4bce8eb    INDEX     q   CREATE INDEX django_admin_log_content_type_id_c4bce8eb ON public.django_admin_log USING btree (content_type_id);
 =   DROP INDEX public.django_admin_log_content_type_id_c4bce8eb;
       public         postgres    false    213            b           1259    45414 !   django_admin_log_user_id_c564eba6    INDEX     a   CREATE INDEX django_admin_log_user_id_c564eba6 ON public.django_admin_log USING btree (user_id);
 5   DROP INDEX public.django_admin_log_user_id_c564eba6;
       public         postgres    false    213            c           1259    45433 #   django_session_expire_date_a5c62663    INDEX     e   CREATE INDEX django_session_expire_date_a5c62663 ON public.django_session USING btree (expire_date);
 7   DROP INDEX public.django_session_expire_date_a5c62663;
       public         postgres    false    214            f           1259    45432 (   django_session_session_key_c0390e0f_like    INDEX     ~   CREATE INDEX django_session_session_key_c0390e0f_like ON public.django_session USING btree (session_key varchar_pattern_ops);
 <   DROP INDEX public.django_session_session_key_c0390e0f_like;
       public         postgres    false    214            �           2606    45353 O   auth_group_permissions auth_group_permissio_permission_id_84c5c92e_fk_auth_perm    FK CONSTRAINT     �   ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissio_permission_id_84c5c92e_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;
 y   ALTER TABLE ONLY public.auth_group_permissions DROP CONSTRAINT auth_group_permissio_permission_id_84c5c92e_fk_auth_perm;
       public       postgres    false    3138    201    205            �           2606    45348 P   auth_group_permissions auth_group_permissions_group_id_b120cbf9_fk_auth_group_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_b120cbf9_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;
 z   ALTER TABLE ONLY public.auth_group_permissions DROP CONSTRAINT auth_group_permissions_group_id_b120cbf9_fk_auth_group_id;
       public       postgres    false    3143    205    203                       2606    45339 E   auth_permission auth_permission_content_type_id_2f476e4b_fk_django_co    FK CONSTRAINT     �   ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_2f476e4b_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;
 o   ALTER TABLE ONLY public.auth_permission DROP CONSTRAINT auth_permission_content_type_id_2f476e4b_fk_django_co;
       public       postgres    false    3133    199    201            �           2606    45368 D   auth_user_groups auth_user_groups_group_id_97559544_fk_auth_group_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_group_id_97559544_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;
 n   ALTER TABLE ONLY public.auth_user_groups DROP CONSTRAINT auth_user_groups_group_id_97559544_fk_auth_group_id;
       public       postgres    false    3143    203    209            �           2606    45363 B   auth_user_groups auth_user_groups_user_id_6a12ed8b_fk_auth_user_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_user_id_6a12ed8b_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;
 l   ALTER TABLE ONLY public.auth_user_groups DROP CONSTRAINT auth_user_groups_user_id_6a12ed8b_fk_auth_user_id;
       public       postgres    false    3151    209    207            �           2606    45382 S   auth_user_user_permissions auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm    FK CONSTRAINT     �   ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;
 }   ALTER TABLE ONLY public.auth_user_user_permissions DROP CONSTRAINT auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm;
       public       postgres    false    211    201    3138            �           2606    45377 V   auth_user_user_permissions auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;
 �   ALTER TABLE ONLY public.auth_user_user_permissions DROP CONSTRAINT auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id;
       public       postgres    false    3151    211    207            �           2606    45403 G   django_admin_log django_admin_log_content_type_id_c4bce8eb_fk_django_co    FK CONSTRAINT     �   ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_content_type_id_c4bce8eb_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;
 q   ALTER TABLE ONLY public.django_admin_log DROP CONSTRAINT django_admin_log_content_type_id_c4bce8eb_fk_django_co;
       public       postgres    false    199    213    3133            �           2606    45408 B   django_admin_log django_admin_log_user_id_c564eba6_fk_auth_user_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_user_id_c564eba6_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;
 l   ALTER TABLE ONLY public.django_admin_log DROP CONSTRAINT django_admin_log_user_id_c564eba6_fk_auth_user_id;
       public       postgres    false    3151    207    213            �           2606    45474 P   mainapp_customerprofile mainapp_customerprofile_user_id_7f34f82d_fk_auth_user_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.mainapp_customerprofile
    ADD CONSTRAINT mainapp_customerprofile_user_id_7f34f82d_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;
 z   ALTER TABLE ONLY public.mainapp_customerprofile DROP CONSTRAINT mainapp_customerprofile_user_id_7f34f82d_fk_auth_user_id;
       public       postgres    false    218    3151    207            �           2606    45447 @   mainapp_profile mainapp_profile_user_id_8b20b871_fk_auth_user_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.mainapp_profile
    ADD CONSTRAINT mainapp_profile_user_id_8b20b871_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;
 j   ALTER TABLE ONLY public.mainapp_profile DROP CONSTRAINT mainapp_profile_user_id_8b20b871_fk_auth_user_id;
       public       postgres    false    3151    216    207            
      x������ � �            x������ � �         �  x�u�ݒ�0�����	:�7�u_�3���)�m���lIƹ[�ߙ=r8�r�������V��M���,ݼM�,*W��O�%vt��w;����&�%�f4����&��?�����KJ���k��Q4�+����^<u���B˞��Mb��'��M��v~�%�%��e/�/�_B�FO��;N���IWP	4sҔ��[gU���X鼊:d���)#F��F3B��r�����c7_�%����{b�"��]1m���/��1������U5�n/��.D�"M
^d,�ѫ�Y�",�Rd��0}�Cg�L�,�B�I�h��"U�FÜf�,��$�K�����Q70,��;)�w,�:��~,b�:I��X@���Ͷ��<����L���K��;:+E�RJl�d�L頷��z�Ο�~��ܒ�1Y�]Pޓ�1eܝWV�DwL'�*J�8�����r���X�J�\p��"�Eㄲh���F�<�u�����Pѕ|#�pF˷R��&g43�.tFR��e�^*w/&,t-B �;Fd60�w�h ���)��zL�;�ֵH��F�	�pK�߇�v)1ݼ_͓���k��ㆵ��k���S�|�?.0A�b�nN�0�a5�78m�߷�F� ���h�\��Cc�pPt̏oZ��b�v         �  x�u��o�0�����w�qm��Gr�p�1��@G�\�� 2�L��7�y��}�m����iЏ��C�bq�7V��8��R岹m�,�I_���	�NA�]�O߂��.߯� ��QY��	��;���a�Y�2�I�7HTrTa��{���"���@F�˭S��O|S�Kí2�mo�'|���ژ�����;i⏿��C�*b�V$"��"8�"f�.+��.ޔ}h�m�PE�"a]��o�.�cfOaC'�T?/�Ys�<�q�IrY����VE��P���G�o��I�xXVE��&�k��ZP~�h�c��芻^��fpa>k'�B��}���;z�U�*�x*P"v���h�VQ/�s�F�I�K�Өr���K�H�zn���W��2�"��Bȣ�C���|�9����H            x������ � �            x������ � �           x��ZMo�=�~�@�\�m��,~�ͻ�Xǎ�u������iK3zF�u���)�4왮��4`Cb��&߫z$e*T��S��UcBC���y����Ѫ�j�.o�n�VP}�z��vy�,����/�K<�l@7����TW}�]m��u�tU��(;D���P�Pc�CT��*�q���q"9'>s0�v��&a��t�Ǒ�QT+��Q��W�媏�}\��U��D[�v���^�w�x���� %�P׀��n㺄 AFp��U�w<'%���������~X��n�m/c_�-���<#= ��u{��Jf���jo�q���Ǜ?�&�]�(�3T?�}f��J����P���@2U�����)��`�o����@T��t���$����T;͜;,1/�Oq��[�i񖹿-��ҵ�d(��~b�\��fY�AAܐ�F���Toc���xU�'��%gJ��zΓ���G:�w�^/���O���vw����E����C�sx�7��%��H#��O���Ha��I��3Τ��d��

�65>���t�-~�V\=L��I��R%�Q)KzT�f�1r�Z��ޗ��B����Y��|=_�EK*�נ�rV��	�rN	�R)�9OԽ�ƢN�B,Z�rM��h,kN�9�;�I�̖C�e�"�ni?��
9�5ȁ�k���얨z���TX�Xi��=���;�_��v��i���XM��@i@:8'�v��r��[�I���Xl�����n�JL�EB�(�59�yAB���d��/�	2B��
� ���u������Cj^
r���>^�;�L��)r�s���m�cI!���q�p�Yv��ￔ�g!��`=B�S}��|���0}�1X#�6yZ��{��;�L	F0�a؇io3�����]]u��TPC�!�n㺻^��˻� .6���x�]��ǖ����
��.�:�3��}�	�q�A�MB�A���c���7�H���ۢ3xh\��Pq�
v	HPS[����	�������g�$x�i͝
��2{�����ﻋ�_�;lƆx�g�`�J���v��Ɔ�u�4��2�/s�~�� ��X���M���.mtH�[7 5D�-#����L:a8�F�~��`��^��͐�8�Ia��_{F� ����5��U{z�&r��"��MmF*��X���7\#q�H�I�m�ⴔg$�I|MN��R陑��4��;�0��UrF�	�\9�(ې�j>#��Hak�� n����!�o�;��y͇9B��<IY������H!�N�z❡ ����9�]�3�N��I��)�@6�a����������8a3gd¦d��|���g$�fL.�
��{�c�>#�5����5���-f$��dk=�~.�;�FhF!kJ�l6��q��CH��!�����a����5���m<�z��}b
/�m�%�D~�sF
!l�?cʹ�}�3/nS��ɕ��E�M�P�M���2��*y�	�J�銆���8��B�Ѹ���Mi��
����S8���.dmS��`�>�?���][����;��]�p!j�� x�r�����]:�t��%;�9>B�.U���f��?�> Q�T=��)]��|j�#9� G�� ��{U5�w�md4m��-䑅h��f�{����pn�p2<<�;U�淛�b���&7���E�2�V������u{?�{h?�����?���n�k�#�p���ŵ�= s�Nt���r�{a5��P4�7�!
�.	��`�p��䛧�ߛǛ���C;\����x��$����������0^��f��x_o��ߏ�XeJ����*��1��mw7�߳������6�g��no���ϻ�{��>)��T7��0/���x��|3���M��	��>3� �ޜ yc�?D��?Aj��>�Qȋf�4��m'Z@�`HG�&��gG��s`�t�Vʆ���zء�cE�+D �ɺ� _��V(���e�#š*��̑���^"7l�j�h�m5�?9\b���<D��>;;��q�         �   x�e�M�B1��e1F�{q��M��G���ۨ�1q�9p��L���(�N�^Z6VX��\BdX�[5I�������7�2U3:u�n ��Ra?��=��p�Cz����7��&F$�3����1DG���2q6} �5��B���~�I��ͻk�7�[�ߛ���w���{m�s� <]{T         �  x����n�8@��W�>��ڸ�[[��-���O�#R%���Ҁ��3Y|��^���t�^��˓s��0_�q����/^���z���?Nzr��4ޮ�������E�4����_�JcZV�
���]w|�5�����4�.�����!F����Z1�t_���0��߇�o��U��!Cą���eK�C�f8���cG�,�`�0��y8M��|��me°����!Ląr�Xi��n�����#�!X@��؂��}S����@ŔÁ����x��{������H�LE9�
����\�}��!�N�T���a�Џq7�����rb:���a?].��g.��� �㇁�C�=t5\\a�!\EC׳J��[h�����w$�)�C�J��v�hM��|��˸�q�<����t��?�c��	j`�|O�O�p�|﨣n��d�W�O.Rj�'�ES,��Y= �5=�8�w����jԋt5�KF"Z�4����s��z��\�B��@�u�1���`����r=
�߼�6����)t1Q(�Ů����m���7�բ4 Jc萜�r�޲R{��Rà�s� 9$*�`9Sb��;%�z&��H�H+�^� =�.��TVUhUU�ʺ���J���B�*$���ҳh�ǒkd]���^��w����]���J�U�G��Q�;r/d]���a�+4w��w$�kΐuB���24q]�N;j��b��2�A`��5����6�j�uPYC
��Ћ�@�V�z��a5E7h_�
x���N����`�%C�/�KS*����!�.W-�ݵ���B���NVU���ﴃ�A���Ru�d�*�P�0����hH!	c(�`k)��'��h�N��_4��w��T�Uex�\���{�+��E)J�[A�
�����y'-Cr-���d�������s>��ch�V4A��\Z[11>��{�X���uNj-f+&����m{�N<^h�$�a��Spe�{OQ���k�e�%�	�p����v�ZJ.�j/�5�VKB��뎅+�h�i���e�R
�J�!zX��"z�o���b�$������j/�%o�bn�^R�u�I2|�Uf��JH�/�H�oIâ[M6�hM%5u�[J�e��s��t������LHP;�F5��G5�dg��@��Rl��0�so]��b]���`�a����@����*�����!Ϣ	Q=�u��a@ ��\@���:�],��5����0�j��{|����2m:S
�{�SN��+ �"���2��[f?�ӻ�������2��{	�^H����7s)>T����^hr-h5��Xn�o&�mdd �2��8}(&_��~3�r��DF�-[�5�:J�z�7��62y� s�:���¹�D�Ӫ���|���-s��S�İN�~�z�fp̦�}Ļ)�c
B�>M��!7��|:͇�2<����:�'Y����9�M㤺8Z)�;/w��mI������`#��         F  x����n�0 �����/�(��Lє�	Jv�Am)�Y)O?�,{�]��K~��8]g]i��9/O����4��� i���x��7԰&�y�a���obo������0$O3Z;�L�c��>M�}o�FQC�S%h	˕ܗ	���Q"�4&�VG��N2o�ǺᏼLӻH"���_W�sԹ�K�nu�l�z�����IY����k�@��'������4G�b���6n*]q)*����h�_@`�9c\�� L	�ز^q1��@UV��`[U�v��n�5k�鮗�	���:��\ �ڎ�������{��u      )      x�3�,I���+��LN�42����� H��         �  x�m�Mo� ���_������cv�CӤ[m��\��W@\��~��*=��`���gf��PtN O3�����M]�U�`����A�^�A�&8��Y^�U4�و�H���I��Σ��j�&�W��V��%%oh�rqҔ��^���Jz����Oh5�G��U@�9�jx�9�̲(�����C���6�����m�֏�V���!�G�+?��i~���Yg)g6�i��XHj�׭�g���b��S2D���/B�%Q��&a��3���y�(/J/%n�efP�ȗ�P�
�,��%(����y+���7�2n4�c�c۲�k��h/�&���N�O�?�f�\׊�0:��B�Itm�j꺙������W�.Q���q����N
}t�a�$�_���*         k  x�m�OO�@���OѓGC[�E���x����]�t��O��b���f;3��e=� g��v�x�7S:
��m���[�Kw��]����VYFW>�~z�6�5X[)=�:�c�w(&�~cϰ��%#7��NG�b��0ieJ�8ߢ�P�RD�zgڧGW�ҺGأr��.-��Z댖Q�����0�{vu��J�d��+���}�*���D��U2��I������Knҧ[�E�n̫���<��4{-��Ƃ{�+I�U��?����kw'4sN���ޡ�xvvD�f/?*|�C��7��)���/����?�ѣ��m�t%>�K�n�W��4Y�c�8&�DJ�0l����2��O7�n      #      x�3�42�4�4����� ��         �   x�M��N�0D���/��8E��C%� q�&Kl�8��
��؍*��ݝь���Ù����4�9X��O(��0��|�볖9�Ƞ������(#:x�t�}���a��5sS�M�)Q�G,ׅA�6��JkM�ꄆCX�Xso)T���Z�"����3����zk��eۦa���H��^
s�sS�Mو�Źz�9,�i�W����	!� �aX�         �   x�M��� ��WpoS�V�O0Vcⵉ�ح� @�~�'�a�y�_�`�lJ��l!���F��>C/AB(�l�nrp1�u�p�j��jF����SX��g����i�Օ.�7�:���9)2      %      x������ � �      '      x������ � �            x�3�4������ V      !     x��SQo�0~��
+/{d;1IxCЩ�F������I\���q�v�}*`Ў�I�:i�������}�)p
!L��!��dT�%�$S��Ky��0n���L�;��`���}��K[�M���?ҥ^H�E�~��:�X�+�I��J��ɔ|׮ �<%V.� ��Ԯ�r����م?`�r���)t����n�q�=�^��j^����Ȓ\Z�m�W���h�"�r�T�ʙS�$�6�Xg<��M��=��-� w�z�� YEb��H �8���m�����g� �i�o�C�Nfhzv�����	�!�X��d&���������,��u��8\�F)�-QXzu6{kL�c\a�Z�B�a������g�`au]�j�.M��{��z�ZW�>]����:��8ΰ�C!�W�@X���F���^\,�+��j�#,x�u��65",٤�T��B�{��Rf�6;�M�$�7(��;��uvKW/f��'D<L(�Y�$��^Rt��>����Q��d�r��'�������yqCy_�<��	�'\�     