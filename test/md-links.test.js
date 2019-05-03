const mdLinks = require('../index.js');

/* Test for know if there is a mdFile*/
describe('Linksmd', () => {
  test('Should be a function', () => {
    expect(typeof (Linksmd.mdFile)).toBe('function');
  });
  test('should return a file with extension .md when user type', () => {
    expect(Linksmd.mdFile('readme.md')).toEqual(true);
  });
});

describe('markdown-link-extractor', () => {
  test('Should return an empty array while no links are in file', () => {
      let links = markdownLinkExtractor('No links found here');
      expect(links).to.be.an('array');
      expect(links).to.have.length(0);
  });
});