package com.nashaofu.blog.controller;

import com.nashaofu.blog.model.Article;
import com.nashaofu.blog.repository.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

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

    @GetMapping("/detail/{id}")
    public Optional<Article> detail(@PathVariable("id") String id) {
        return this.articleRepository.findById(id);
    }


    @GetMapping("/query")
    public Page<Article> query(
            @RequestParam(value = "title", required = false) String title,
            @RequestParam(value = "page", required = false) Integer page,
            @RequestParam(value = "size", required = false) Integer size
    ) {
        if (page == null) {
            page = 0;
        }
        if (size == null) {
            size = 10;
        }
        PageRequest pageRequest = PageRequest.of(page, size, Sort.unsorted());
        Article article = new Article();
        article.setTitle(title);
        ExampleMatcher exampleMatcher = ExampleMatcher.matching().withMatcher("title", match -> match.regex());
        return this.articleRepository.findAll(Example.of(article, exampleMatcher), pageRequest);
    }
}
