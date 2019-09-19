const express = require("express");
const RSS = require("rss");
const axios = require("axios");

const app = express();

const port = 3000;
const rssFeedPath = "/rss.xml";
const now = Date.now();

function isReleased(RSSFeedItem) {
  const releaseDate = new Date(RSSFeedItem.date)
  return releaseDate.getTime() <= now;
}

function mapToRSSFeed(dataFromFrontend) {
  const mapToRSSFeedBaseInfo = dataFromFrontend => ({
    title: dataFromFrontend.title,
    description: dataFromFrontend.description,
    managingEditor: dataFromFrontend.author.name,
    feed_url: dataFromFrontend.home_page_url + "/rss.xml",
    site_url: dataFromFrontend.home_page_url,
    image_url: dataFromFrontend.home_page_url + "/todo.jpg",
    language: "en-US",
    copyright: "All rights reserved 2019, Florian Kempenich"
  });
  const mapToRSSFeedItem = itemFromFrontend => ({
    title: itemFromFrontend.title,
    date: itemFromFrontend.date_modified,
    url: itemFromFrontend.url,
    description: itemFromFrontend.summary,
    custom_elements: [
      { "content:encoded": { _cdata: itemFromFrontend.content_html } }
    ]
  });

  const baseInfo = mapToRSSFeedBaseInfo(dataFromFrontend);
  const feed = new RSS(baseInfo);
  dataFromFrontend.items
    .map(mapToRSSFeedItem)
    .filter(isReleased)
    .forEach(RSSFeedItem => feed.item(RSSFeedItem));
  return feed;
}

app.get(rssFeedPath, (_, res) => {
  const extractDataAsJSON = resp => resp.data;
  const sendRSSFeedAsXML = rssFeed => {
    res.type("application/xml");
    res.send(rssFeed.xml());
  };
  const logError = error => console.error(error);

  axios
    .get("https://professionalbeginner.com/allPosts.json")
    .then(extractDataAsJSON)
    .then(mapToRSSFeed)
    .then(sendRSSFeedAsXML)
    .catch(logError);
});

app.listen(port, () => {
  console.log(`RSS Feed accessible at: http://localhost:${port}/rss.xml`);
});
