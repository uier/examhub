export default [
  `
  CREATE TABLE if not exists user (
    user_id       int not null auto_increment,
    name          varchar(16) not null,
    email         varchar(40) not null,
    role          tinyint check (role >= 0 and role <= 2) default 2,
    contribution  int not null default 0,
    create_time   datetime not null,
    password      varchar(32) not null,
    primary key (user_id)
  );
  `,
  `
  CREATE TABLE if not exists course (
    course_id     int not null auto_increment,
    course_name   varchar(32) not null,
    dept_name     varchar(32) not null,
    category      varchar(16) default '',
    description   varchar(4096) default '',
    primary key (course_id)
  );
  `,
  `
  CREATE TABLE if not exists comment_area (
    area_id       int not null auto_increment,
    primary key (area_id)
  );
  `,
  `
  CREATE TABLE if not exists document (
    doc_id              int not null,
    course_id           int not null default -1,
    user_id             int not null default -1,
    year                smallint not null,
    semester            tinyint not null,
    title               varchar(64) not null,
    description         varchar(4096) default '',
    create_time         datetime not null,
    last_update_time    datetime not null,
    upvote              int not null default 0,
    downvote            int not null default 0,
    folder_path         varchar(1024) not null,
    primary key (doc_id),
    foreign key (doc_id) references comment_area(area_id),
    foreign key (course_id) references course (course_id) on update cascade on delete set default,
    foreign key (user_id) references user (user_id) on update cascade on delete set default
  );
  `,
  `
  CREATE TABLE if not exists annoncement (
    ann_id              int not null auto_increment,
    user_id             int not null default -1,
    title               varchar(64) not null,
    content             varchar(4096) not null default '',
    pinned              bool not null default false,
    create_time         datetime not null,
    last_update_time    datetime not null,
    primary key (ann_id),
    foreign key (user_id) references user (user_id) on update cascade on delete set default
  );
  `,
  `
  CREATE TABLE if not exists comment (
    com_id              int not null,
    doc_id              int not null,
    reply_id            int not null,
    user_id             int not null default -1,
    content             varchar(4096) not null,
    create_time         datetime not null,
    last_update_time    datetime not null,
    primary key (com_id),
    foreign key (com_id) references comment_area(area_id),
    foreign key (reply_id) references comment (com_id) on update cascade on delete cascade,
    foreign key (user_id) references user (user_id) on update cascade on delete set default
  );
  `,
  `
  CREATE TABLE if not exists vote (
    user_id       int not null,
    doc_id        int not null,
    score         smallint check (score in (-1, 1)),
    primary key (user_id, doc_id),
    foreign key (user_id) references user(user_id) on update cascade on delete cascade,
    foreign key (doc_id) references document(doc_id) on update cascade on delete cascade
  );
  `,
];
