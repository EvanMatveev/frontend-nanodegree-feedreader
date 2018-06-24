/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* The tests are placed within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(
  (function() {
    //   Test whether the feeds are loaded without any exceptions

    describe("RSS Feeds", function() {
      it("are defined", function() {
        expect(allFeeds).toBeDefined();
        expect(allFeeds.length).not.toBe(0);
      });

      it("have URLs defined and not empty", function() {
        allFeeds.forEach(function(item) {
          expect(item.url).toBeDefined();
          expect(item.url.length).not.toBe(0);
        });
      });

      it("have names defined and not empty", function() {
        allFeeds.forEach(function(item) {
          expect(item.name).toBeDefined();
          expect(item.name.length).not.toBe(0);
        });
      });
    });

    // Tests for describing the hidden menu functionality

    describe("The menu", function() {
      // When the page loads the menu item should not have menu-hidden class
      let body = $("body");
      let menuIconLink = $(".menu-icon-link");
      it("should be hidden by default", function() {
        expect(body.hasClass("menu-hidden")).toBe(true);
      });

      it("is shown and hidden when clicked", function() {
        menuIconLink.click();
        expect(body.hasClass("menu-hidden")).toBe(false);
        menuIconLink.click();
        expect(body.hasClass("menu-hidden")).toBe(true);
      });
    });

    // Make sure at least one feed element is loaded on loadFeed() completion
    describe("Initial Entries", function() {
      beforeEach(function(done) {
        loadFeed(0, function() {
          done();
        });
      });
      it("should be within the .feed container", function(done) {
        expect($(".feed .entry")).toBeDefined();
        done();
      });
    });

    // Make sure the content is updated when the feed source is changed

    describe("New Feed Selection", function() {
      let initialFeed, newFeed;
      beforeEach(function(done) {
        loadFeed(0, function() {
          initialFeed = $(".feed")
            .children("a")
            .eq(0);
          done();
        });
        loadFeed(1, function() {
          newFeed = $(".feed")
            .children("a")
            .eq(0);
          done();
        });
      });

      //   Test whether the new state is equal to the previous state

      it("should be different from the previous feed", function() {
        expect(initialFeed).not.toBe(newFeed);
      });
    });
  })()
);
