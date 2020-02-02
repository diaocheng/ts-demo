package com.nashaofu.blog.repository;

import com.nashaofu.blog.model.Article;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class ArticleRepository implements MongoRepository<Article, String> {
    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public <S extends Article> S save(S s) {
        return this.mongoTemplate.save(s);
    }

    @Override
    public <S extends Article> List<S> saveAll(Iterable<S> iterable) {
        return null;
    }

    @Override
    public Optional<Article> findById(String s) {
        return Optional.empty();
    }

    @Override
    public boolean existsById(String s) {
        return false;
    }

    @Override
    public List<Article> findAll() {
        return null;
    }

    @Override
    public Iterable<Article> findAllById(Iterable<String> iterable) {
        return null;
    }

    @Override
    public long count() {
        return 0;
    }

    @Override
    public void deleteById(String id) {
        Query query = new Query(Criteria.where("id").is(id));
        mongoTemplate.remove(query, Article.class);
    }

    @Override
    public void delete(Article article) {

    }

    @Override
    public void deleteAll(Iterable<? extends Article> iterable) {

    }

    @Override
    public void deleteAll() {

    }

    @Override
    public List<Article> findAll(Sort sort) {
        return null;
    }

    @Override
    public Page<Article> findAll(Pageable pageable) {
        return null;
    }

    @Override
    public <S extends Article> S insert(S s) {
        return this.mongoTemplate.insert(s);
    }

    @Override
    public <S extends Article> List<S> insert(Iterable<S> iterable) {
        return null;
    }

    @Override
    public <S extends Article> Optional<S> findOne(Example<S> example) {
        return Optional.empty();
    }

    @Override
    public <S extends Article> List<S> findAll(Example<S> example) {
        return null;
    }

    @Override
    public <S extends Article> List<S> findAll(Example<S> example, Sort sort) {
        return null;
    }

    @Override
    public <S extends Article> Page<S> findAll(Example<S> example, Pageable pageable) {
        return null;
    }

    @Override
    public <S extends Article> long count(Example<S> example) {
        return 0;
    }

    @Override
    public <S extends Article> boolean exists(Example<S> example) {
        return false;
    }
}

