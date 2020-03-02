package com.nashaofu.blog.controller;

import com.nashaofu.blog.model.Article;
import com.nashaofu.blog.repository.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/article")
public class ArticleController {
    @Autowired
    private ArticleRepository articleRepository;

    @PostMapping(value = "/insert")
    public Article insert(@RequestBody Article article) {
        return this.articleRepository.insert(article);
    }

    @DeleteMapping("/remove/{id}")
    public void remove(@PathVariable("id") String id) {
        this.articleRepository.remove(id);
    }

    @PutMapping("/save/{id}")
    public Article save(@PathVariable("id") String id, @RequestBody Article article) {
        article.setId(id);
        return this.articleRepository.save(article);
    }

    @GetMapping("/find")
    public Page<Article> find(
            @RequestParam(value = "title", required = false) String title,
            @RequestParam(value = "page", required = false) Integer page,
            @RequestParam(value = "size", required = false) Integer size,
            @RequestParam(value = "sort", required = false) String sort
    ) {
        if (page == null) {
            page = 0;
        }
        if (size == null) {
            size = 10;
        }

        String[] sortString = sort.split(",");
        List<Sort.Order> orders = new ArrayList();
        for (int i = 0; i < sortString.length; i+=2) {
            Sort.Order order = sortString[i] == "ASC" ?  Sort.Order.asc(sortString[i+1]):Sort.Order.desc(sortString[i+1]);
            orders.add(order);
        }
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "time"));
        Article article = new Article();
        article.setTitle(title);
        ExampleMatcher exampleMatcher = ExampleMatcher.matching().withMatcher("title", match -> match.regex());
        return this.articleRepository.find(Example.of(article, exampleMatcher), pageRequest);
    }

    @GetMapping("/findById/{id}")
    public Optional<Article> findById(@PathVariable("id") String id) {
        return this.articleRepository.findById(id);
    }
}
