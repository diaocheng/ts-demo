package com.nashaofu.blog.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@Document
public class Article implements Serializable {
    @Id
    private String id;
    private String title;
    private String content;
    private LocalDateTime time;
}
