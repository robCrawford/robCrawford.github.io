
Jekyll website template
-----------------------
This site uses the automatic Jekyll support in GitHub Pages.  
https://help.github.com/articles/using-jekyll-with-pages/  

- **To update content**  
Edit `index.md`  

- **To update HTML template**  
Edit `_layouts/default.html`

Markdown is transformed (into `_site` directory) on push to GitHub. 


Dev setup
---------

- Install Ruby
- Install Bundler (`gem install bundler`)
- Install project dependencies (Jekyll)  
`cd /path/to/project`  
`bundle install`

Start Jekyll dev server, runs at `http://localhost:4000`  
Jekyll will also watch the project directory for file changes.
- `bundle exec jekyll serve`


Blog posts
----------
To add new posts, add a file in the `_posts` directory named:  
`YYYY-MM-DD-name-of-post.ext` i.e. `2014-08-21-another-post.md`.  
Syntax for generating links is below.


Jekyll syntax
-------------
*Docs at [jekyllrb.com](http://jekyllrb.com/docs/variables/).*

Front matter: 
```
---
layout: post
title: "Welcome to Jekyll!"
date: 2014-08-16 22:21:25
categories: jekyll update
---
```

Variables:
```
{{ page.title }}
{{ content }}
```

Includes:
```
{% include header.html %}
```

Loops i.e. blog post markdown:
```
{% for post in site.posts %}
> [ {{ post.title }} ]( {{ post.url }} )
{% endfor %}
```


