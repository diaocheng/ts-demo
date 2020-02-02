package com.nashaofu.blog.controller;

import com.nashaofu.blog.model.Article;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/article")
public class ArticleController {
    @PostMapping(value = "/add")
    public Article add(@RequestBody Article article) {
        return article;
    }

    @DeleteMapping("/delete/{id}")
    public Article delete(@PathVariable("id") String id) {
        Article article = new Article();
        article.setId(id);
        return article;
    }

    @PatchMapping("/update/{id}")
    public Article update(@PathVariable("id") String id, @RequestBody Article article) {
        article.setId(id);
        return article;
    }
}
