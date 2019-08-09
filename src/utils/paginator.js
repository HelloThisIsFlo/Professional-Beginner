function ensurePageNumValid(pageNum) {
  const numberOfPages = this.numberOfPages();
  const belowMin = pageNum <= 0;
  const aboveMax = pageNum > numberOfPages;
  if (belowMin || aboveMax)
    throw new Error(
      `Page '${pageNum}' doesn't exist. Valid pages: [${1} - ${numberOfPages}]`
    );
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
    return Math.ceil(numOfPosts / this.numOfPostsPerPage);
  }

  getPage(pageNum) {
    ensurePageNumValid.call(this, pageNum);

    const start = (pageNum - 1) * this.numOfPostsPerPage;
    const end = start + this.numOfPostsPerPage;
    return this.publishedBlogPosts
      .slice(start, end)
      .map(postWithDate => postWithDate.post);
  }
}

export class PostWithDate {
  constructor(postNode, date) {
    this.post = postNode;
    this.date = date;
  }
}
