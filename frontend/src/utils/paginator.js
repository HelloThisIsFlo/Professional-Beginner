function isInvalidPage(pageNum) {
  const numberOfPages = this.numberOfPages();
  const belowMin = pageNum <= 0;
  const aboveMax = pageNum > numberOfPages;
  return belowMin || aboveMax;
}

export default class Paginator {
  constructor(numOfPostsPerPage, currentDate, blogPostsWithDate) {
    this.numOfPostsPerPage = numOfPostsPerPage;
    this.currentDate = currentDate;
    this.publishedBlogPosts = blogPostsWithDate.filter(
      ({ date }) => date <= currentDate
    );
  }

  numberOfPages() {
    const numOfPosts = this.publishedBlogPosts.length;
    return numOfPosts === 0
      ? 1
      : Math.ceil(numOfPosts / this.numOfPostsPerPage);
  }

  getPage(pageNum) {
    if (isInvalidPage.call(this, pageNum)) {
      return [];
    }

    const start = (pageNum - 1) * this.numOfPostsPerPage;
    const end = start + this.numOfPostsPerPage;
    return this.publishedBlogPosts
      .slice(start, end)
      .map((postWithDate) => postWithDate.post);
  }
}

export class PostWithDate {
  constructor(postNode, date) {
    this.post = postNode;
    this.date = date;
  }
}
