const express = require("express");
const app = express();
const port = 3000;

const rssFeedPath = "/rss.xml";

function fakeRSS() {
  return `\
<?xml version="1.0" encoding="utf-8" standalone="yes" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Stuck in the loop</title>
    <link>https://stuckintheloop.com/</link>
    <description>Recent content on Stuck in the loop</description>
    <generator>Hugo -- gohugo.io</generator>
    <language>en-us</language>
    <copyright>Copyright &amp;copy; 2019 - Antonio Pires</copyright>
    <lastBuildDate>Sun, 15 Sep 2019 17:35:20 +0100</lastBuildDate>
    
	<atom:link href="https://stuckintheloop.com/index.xml" rel="self" type="application/rss+xml" />
    
    
    <item>
      <title>Rserve to the rescue!</title>
      <link>https://stuckintheloop.com/posts/rserve_to_the_rescue/</link>
      <pubDate>Sun, 15 Sep 2019 17:35:20 +0100</pubDate>
      
      <guid>https://stuckintheloop.com/posts/rserve_to_the_rescue/</guid>
      <description>Last week I participated in a two day hackaton. It was a cool initiative that gave me an opportunity to work with people from different areas and with technology I am not familiar with.</description>
    </item>
    
    <item>
      <title>A race condition during authentication</title>
      <link>https://stuckintheloop.com/posts/a_race_condition_during_authentication/</link>
      <pubDate>Sun, 01 Sep 2019 18:30:41 +0100</pubDate>
      
      <guid>https://stuckintheloop.com/posts/a_race_condition_during_authentication/</guid>
      <description>Recently one of our applications needed to be integrated with a central authentication service. This application was built with Spring Boot, so we decided to implement this functionality using the Spring Security library that was already being imported anyway.</description>
    </item>
    
    <item>
      <title>A leaking queue</title>
      <link>https://stuckintheloop.com/posts/a_leaking_queue/</link>
      <pubDate>Sun, 04 Aug 2019 16:14:10 +0100</pubDate>
      
      <guid>https://stuckintheloop.com/posts/a_leaking_queue/</guid>
      <description>Everything was running smoothly when we left for the weekend. Monday morning we got back and we had multiple alerts waiting for us, one of our java applications was misbehaving&amp;hellip; Thankfully it was a test environment and changes had not yet been released to production :).</description>
    </item>
    
    <item>
      <title>About the java direct buffer pool</title>
      <link>https://stuckintheloop.com/posts/about_java_buffer_pool/</link>
      <pubDate>Sun, 21 Jul 2019 15:44:23 +0100</pubDate>
      
      <guid>https://stuckintheloop.com/posts/about_java_buffer_pool/</guid>
      <description>While looking into one of our metrics dashboard, 2 of the graphs caught our attention. The titles on them were Direct buffer and Mapped buffer. What do these graphs measure and why should we monitor them?</description>
    </item>
    
    <item>
      <title>My first kafka outage</title>
      <link>https://stuckintheloop.com/posts/my_first_kafka_outage/</link>
      <pubDate>Sat, 29 Jun 2019 14:50:34 +0100</pubDate>
      
      <guid>https://stuckintheloop.com/posts/my_first_kafka_outage/</guid>
      <description>A few weeks ago myself and my team experienced our first kafka outage and we got to learn a lot from it. This post describes how we approached the problem, the steps we took to debug it and in the end solve it.</description>
    </item>
    
    <item>
      <title>Now!</title>
      <link>https://stuckintheloop.com/posts/now/</link>
      <pubDate>Sat, 08 Jun 2019 11:11:54 +0000</pubDate>
      
      <guid>https://stuckintheloop.com/posts/now/</guid>
      <description>For a long time I&amp;rsquo;ve been trying to write more, not only because I wanted to keep a log of what I do (I have a really bad memory) but also because I think that when I write I get a new perspective on the subject and I&amp;rsquo;m able to pinpoint areas where I lack understanding.</description>
    </item>
    
  </channel>
</rss>
  `;
}


app.get(rssFeedPath, (_req, res) => {
  const rssFeed = fakeRSS();
  res.type("application/xml");
  res.send(rssFeed);
});

app.listen(port, () => {
  console.log(`RSS Feed accessible at: http://localhost:${port}/rss.xml`);
});
