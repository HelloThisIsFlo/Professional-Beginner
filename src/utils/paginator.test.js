import Paginator, { PostWithDate } from "./paginator";

describe("Paginator", () => {
  const fakePost = title => ({ frontmatter: { title: title } });
  const postWithDate = (title, dateString) =>
    new PostWithDate(fakePost(title), new Date(dateString));

  const postsWithDate = [
    postWithDate("fake post july 01", "2019-07-01"),
    postWithDate("fake post july 02", "2019-07-02"),
    postWithDate("fake post july 03", "2019-07-03"),
    postWithDate("fake post july 04", "2019-07-04"),
    postWithDate("fake post july 05 morning", "2019-07-05T09:15"),
    postWithDate("fake post july 05 afternoon", "2019-07-05T17:30"),
    postWithDate("fake post july 06", "2019-07-06"),
    postWithDate("fake post july 07", "2019-07-07")
  ];
  const postsPerPage = 3;

  let paginator;

  describe("All posts are published", () => {
    beforeEach(() => {
      const afterAllPostsPublishedJuly10th = new Date("2019-07-10");
      paginator = new Paginator(
        postsPerPage,
        afterAllPostsPublishedJuly10th,
        postsWithDate
      );

      // Sanity check
      expect(postsWithDate.length).toBe(8);
    });

    it("returns the correct number of pages", () => {
      expect(paginator.numberOfPages()).toBe(3);
    });

    it("throws if page requested doesn' exist", () => {
      expect(() => {
        paginator.getPage(-1);
      }).toThrow("Page '-1' doesn't exist. Valid pages: [1 - 3]");

      expect(() => {
        paginator.getPage(4);
      }).toThrow("Page '4' doesn't exist. Valid pages: [1 - 3]");
    });

    it("returns page 1", () => {
      const expectedPage1 = [
        fakePost("fake post july 01"),
        fakePost("fake post july 02"),
        fakePost("fake post july 03")
      ];
      expect(paginator.getPage(1)).toEqual(expectedPage1);
    });

    it("returns last page", () => {
      const expectedPage3 = [
        fakePost("fake post july 06"),
        fakePost("fake post july 07")
      ];
      expect(paginator.getPage(3)).toEqual(expectedPage3);
    });
  });

  describe("Some posts are not yet published", () => {
    beforeEach(() => {
      const july05atMidday = new Date("2019-07-05T12:00");
      paginator = new Paginator(postsPerPage, july05atMidday, postsWithDate);

      // Sanity check
      expect(postsWithDate.length).toBe(8);
    });

    it("only returns the published posts", () => {
      const expectedPage1 = [
        fakePost("fake post july 01"),
        fakePost("fake post july 02"),
        fakePost("fake post july 03")
      ];
      const expectedPage2 = [
        fakePost("fake post july 04"),
        fakePost("fake post july 05 morning")
      ];

      expect(paginator.numberOfPages()).toBe(2);
      expect(paginator.getPage(1)).toEqual(expectedPage1);
      expect(paginator.getPage(2)).toEqual(expectedPage2);
    });
  });

  describe("Learning tests", () => {
    test("'slice' takes a start and end, not start and length", () => {
      const a = [1, 2, 3, 4];
      expect(a.slice(2, 4)).toEqual([3, 4]);
    });

    test('Regex', () => {
      const res = /\/dynamic-pagination\/page\/(\d+)/.exec('/dynamic-pagination/page/2')
      expect(res[1]).toBe('2')
    })

    test('Expand non-existing elements', () => {
      // const [_, doesntExist] = [1]
      // const [_, doesntExist] = null
      // const res = /\/dynamic-pagination\/page\/(\d+)/.exec('/')
      // console.log(res)
      // console.log(doesntExist)
    })
  });
});
