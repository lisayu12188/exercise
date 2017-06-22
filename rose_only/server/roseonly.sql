SET NAMES 'utf8';
DROP DATABASE IF EXISTS roseonly;
CREATE DATABASE roseonly CHARSET=UTF8;
USE roseonly;

CREATE TABLE ro_item(
    did INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(64),
    series VARCHAR(64),
    sub_series VARCHAR(64),
    qty VARCHAR(32),
    size VARCHAR(32),
    price FLOAT(8,2),
    img VARCHAR(64)
);

INSERT INTO ro_item(did,name,series,sub_series,qty,size, price,img) VALUES
(   null,
    '鲜花玫瑰',
    '经典永续系列',
    '经典',
    '19支',
    '80cm长形',
    1999,
    'g1.jpg'
),
(   null,
    '鲜花玫瑰',
    '经典永续系列',
    '经典',
    '19支',
    '80cm长形',
    1520,
    'g2.jpg'
),
(   null,
    '鲜花玫瑰',
    '经典永续系列',
    '经典',
    '19支',
    '80cm长形',
    1999,
    'g3.jpg'
),
(   null,
    '鲜花玫瑰',
    '经典永续系列',
    '经典',
    '1支',
    '80cm长形',
    1314,
    'g4.jpg'
),
(   null,
    '鲜花玫瑰',
    '经典永续系列',
    '经典',
    '19支',
    '80cm长形',
    1520,
    'g5.jpg'
),
(   null,
    '鲜花玫瑰',
    '经典永续系列',
    '经典',
    '19支',
    '80cm长形',
    1314,
    'g6.jpg'
),
(   null,
    '鲜花玫瑰',
    '经典永续系列',
    '经典',
    '19支',
    '80cm长形',
    1314,
    'g7.jpg'
),
(   null,
    '鲜花玫瑰',
    '经典永续系列',
    '经典',
    '19支',
    '80cm长形',
    1999,
    'g8.jpg'
),
(   null,
    '鲜花玫瑰',
    '经典永续系列',
    '经典',
    '19支',
    '80cm长形',
    999,
    'g9.jpg'
),
(   null,
    '鲜花玫瑰',
    '经典永续系列',
    '经典',
    '19支',
    '80cm长形',
    999,
    'g10.jpg'
);
##SELECT * FROM kf_dish;
CREATE TABLE ro_color(
    cid INT PRIMARY KEY AUTO_INCREMENT,
    c_color_name VARCHAR(32),
    c_color_img VARCHAR(64),
    c_main_img_1 VARCHAR(64),
    c_main_img_2 VARCHAR(64),
    c_main_img_3 VARCHAR(64),
    c_main_img_4 VARCHAR(64),
    c_intro_img_1 VARCHAR(64),
    c_intro_img_2 VARCHAR(64),
    c_intro_img_3 VARCHAR(64),
    c_intro_img_4 VARCHAR(64),
    c_intro_img_5 VARCHAR(64),
    did INT
);
INSERT INTO ro_item(cid,c_color_name,c_color_img,c_main_img_1,c_main_img_2,c_main_img_3,c_main_img_4,
    c_intro_img_1,c_intro_img_2,c_intro_img_3,c_intro_img_4,c_intro_img_5,did) VALUES
(   null,
    '朱砂',
    'zs.png',
    'zs_main_1.jpg',
    'zs_main_2.jpg',
    'zs_main_3.jpg',
    'zs_main_4.jpg',
    'zs_intro_1.jpg',
    'zs_intro_2.jpg',
    'zs_intro_3.jpg',
    'zs_intro_4.jpg',
    'zs_intro_5.jpg',
    1

),
(   null,
    '初心',
    'cx.png',
    'cx_main_1.jpg',
    'cx_main_2.jpg',
    'cx_main_3.jpg',
    'cx_main_4.jpg',
    'cx_intro_1.jpg',
    'cx_intro_2.jpg',
    'cx_intro_3.jpg',
    'cx_intro_4.jpg',
    'cx_intro_5.jpg',
    1
),
(   null,
    '情动',
    'qd.png',
    'qd_main_1.jpg',
    'qd_main_2.jpg',
    'qd_main_3.jpg',
    'qd_main_4.jpg',
    'qd_intro_1.jpg',
    'qd_intro_2.jpg',
    'qd_intro_3.jpg',
    'qd_intro_4.jpg',
    'qd_intro_5.jpg',
    1
),
(   null,
    '惊艳',
    'jy.png',
    'jy_main_1.jpg',
    'jy_main_2.jpg',
    'jy_main_3.jpg',
    'jy_main_4.jpg',
    'jy_intro_1.jpg',
    'jy_intro_2.jpg',
    'jy_intro_3.jpg',
    'jy_intro_4.jpg',
    'jy_intro_5.jpg',
    1
),
(   null,
    '约定',
    'yd.png',
    'yd_main_1.jpg',
    'yd_main_2.jpg',
    'yd_main_3.jpg',
    'yd_main_4.jpg',
    'yd_intro_1.jpg',
    'yd_intro_2.jpg',
    'yd_intro_3.jpg',
    'yd_intro_4.jpg',
    'yd_intro_5.jpg',
    1
);

##SELECT * FROM ro_color;
CREATE TABLE ro_order(
    oid INT PRIMARY KEY AUTO_INCREMENT,
    phone VARCHAR(16),
    user_name VARCHAR(16),
    sex INT,    /*1:男  2:女*/
    order_time LONG,
    addr VARCHAR(256),
    did INT
);
INSERT INTO kf_order(oid, phone,user_name,sex,order_time,addr,did) VALUES
(NULL,'13501234567','婷婷',2,1445154859209,'大钟寺中鼎B座',3),
(NULL,'13501234567','婷婷',2,1445254959209,'大钟寺中鼎B座',2),
(NULL,'13501234567','婷婷',2,1445354959209,'大钟寺中鼎B座',5);

##SELECT * FROM kf_order;