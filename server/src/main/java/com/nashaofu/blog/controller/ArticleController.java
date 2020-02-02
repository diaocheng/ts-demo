package com.nashaofu.blog.controller;

import com.nashaofu.blog.model.Article;
import com.nashaofu.blog.repository.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/article")
public class ArticleController {
    @Autowired
    private ArticleRepository articleRepository;

    @PostMapping(value = "/add")
    public Article add(@RequestBody Article article) {
        return this.articleRepository.insert(article);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable("id") String id) {
        this.articleRepository.deleteById(id);
    }

    @PatchMapping("/update/{id}")
    public Article update(@PathVariable("id") String id, @RequestBody Article article) {
        article.setId(id);
        return this.articleRepository.save(article);
    }
}
