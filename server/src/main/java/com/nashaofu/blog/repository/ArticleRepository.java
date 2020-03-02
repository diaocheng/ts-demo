package com.nashaofu.blog.repository;

import com.nashaofu.blog.model.Article;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Component
public class ArticleRepository {
    @Autowired
    private MongoTemplate mongoTemplate;


    public <S extends Article> S insert(S s) {
        s.setId(null);
        s.setTime(LocalDateTime.now());
        return this.mongoTemplate.insert(s);
    }

    public void remove(String id) {
        Query query = new Query(Criteria.where("id").is(id));
        mongoTemplate.remove(query, Article.class);
    }

    public <S extends Article> S save(S s) {
        s.setTime(null);
        return this.mongoTemplate.save(s);
    }


    public Page<Article> find(Example<Article> example, Pageable pageable) {
        Criteria criteria = Criteria.byExample(example);
        Query query = new Query(criteria);
        long count = this.mongoTemplate.count(query, Article.class);
        query.with(pageable);
        List<Article> articles = this.mongoTemplate.find(query, Article.class);
        Page<Article> page = new PageImpl<Article>(articles, pageable, count);
        return page;
    }

    public Optional<Article> findById(String id) {
        Article article = mongoTemplate.findById(id, Article.class);
        if (article != null) {
            return Optional.of(article);
        } else {
            return Optional.empty();
        }
    }
}

