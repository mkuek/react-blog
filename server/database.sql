CREATE DATABASE pern_blog;

CREATE TABLE blog(
    post_id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    content VARCHAR(255),
    author VARCHAR(255),
    created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated TIMESTAMPTZ
);

CREATE TABLE comments(
    comment_id SERIAL,
    post_id SERIAL,
    commment_text VARCHAR(255),
    author VARCHAR(255),
    created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated TIMESTAMPTZ,
    PRIMARY KEY(comment_id),
    CONSTRAINT fk_comment
    FOREIGN KEY (post_id)
    REFERENCES blog(post_id)
);