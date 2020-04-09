import cheerio from 'cheerio';

export const scraper = (html) => {
  let data = '';
  const $ = cheerio.load(html);
  $('#mp-itn').children().each((i, elem) => {
    data += $(elem).text();
  });

  return data;
};
