---
layout: default
title: Home
---

Welcome
-------
Lorem ipsum dolor sit amet, consectetur adipisicing elit. 

{% highlight javascript %}

    var str = 'Hello world!';

{% endhighlight %}


Name           | Description
-------------- | -------------
Hello          | A greeting
World          | A place


### Posts 

{% for post in site.posts %}
> [ {{ post.title }} ]( {{ post.url }} )
{% endfor %}
