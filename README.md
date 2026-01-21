
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
This project uses Docker to run Jekyll.

### Prerequisites
- Docker Desktop installed and running

### Running the development server

Start Jekyll dev server (runs at `http://localhost:4000`):
```bash
./run.sh
```

Jekyll will automatically watch for file changes and rebuild the site.

### Stopping the server
```bash
docker stop $(docker ps -q --filter ancestor=jekyll/jekyll:latest)
```

### Manual Docker command
If you prefer to run Docker directly:
```bash
docker run --rm \
  --platform=linux/amd64 \
  -p 4000:4000 \
  -v "$PWD:/srv/jekyll" \
  -v "$PWD/.bundle-cache:/usr/local/bundle" \
  jekyll/jekyll:latest \
  jekyll serve --watch --force_polling --host 0.0.0.0
```


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


