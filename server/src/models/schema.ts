export default [
  `
  CREATE TABLE if not exists user (
    userId        int not null auto_increment,
    name          varchar(16) not null,
    email         varchar(40) not null,
    role          tinyint check (role >= 0 and role <= 2) default 2,
    contribution  int not null default 0,
    createTime    datetime not null,
    googleId      varchar(32) not null,
    primary key (userId),
    unique key (email)
  );
  `,
  `
  CREATE TABLE if not exists course (
    courseId      int not null auto_increment,
    courseName    varchar(32) not null,
    deptName      varchar(32) not null,
    category      varchar(16) default '',
    description   varchar(4096) default '',
    primary key (courseId)
  );
  `,
  `
  CREATE TABLE if not exists comment_area (
    areaId        int not null auto_increment,
    primary key (areaId)
  );
  `,
  `
  CREATE TABLE if not exists document (
    docId               int not null,
    courseId            int default null,
    userId              int default null,
    year                smallint not null,
    semester            tinyint not null,
    title               varchar(64) not null,
    description         varchar(4096) default '',
    createTime          datetime not null,
    lastUpdateTime      datetime not null,
    folderPath          varchar(1024) not null,
    primary key (docId),
    foreign key (docId) references comment_area(areaId) on update cascade on delete cascade,
    foreign key (courseId) references course (courseId) on update cascade on delete set null,
    foreign key (userId) references user (userId) on update cascade on delete set null
  );
  `,
  `
  CREATE TABLE if not exists announcement (
    annId               int not null auto_increment,
    userId              int default null,
    title               varchar(64) not null,
    content             varchar(4096) not null default '',
    pinned              bool not null default false,
    createTime          datetime not null,
    lastUpdateTime      datetime not null,
    primary key (annId),
    foreign key (userId) references user (userId) on update cascade on delete set null
  );
  `,
  `
  CREATE TABLE if not exists comment (
    comId               int not null,
    replyId             int not null,
    userId              int default null,
    content             varchar(4096) not null,
    createTime          datetime not null,
    lastUpdateTime      datetime not null,
    primary key (comId),
    foreign key (comId) references comment_area(areaId) on update cascade on delete cascade,
    foreign key (replyId) references comment_area(areaId) on update cascade on delete cascade,
    foreign key (userId) references user (userId) on update cascade on delete set null
  );
  `,
  `
  CREATE TABLE if not exists vote (
    userId        int not null,
    docId         int not null,
    score         smallint check (score = -1 or score = 1),
    primary key (userId, docId),
    foreign key (userId) references user(userId) on update cascade on delete cascade,
    foreign key (docId) references document(docId) on update cascade on delete cascade
  );
  `,
];
