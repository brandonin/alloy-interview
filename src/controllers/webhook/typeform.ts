import { RequestHandler } from 'express';
import axios from 'axios';
import { scraper } from './utils';
import handleErrorMiddleware from '../../middleware/handle-error-middleware';
import ScrapedData from '../../models/ScrapedData';

const typeform: RequestHandler = async (req, res) => {
  let scrapedData;
  if (req.body.isCronJob) {
    scrapedData = await ScrapedData.find().limit(1).sort({ $createdAt: -1 });
  } else {
    const data = await axios
      .get('https://en.wikipedia.org/wiki/Main_Page')
      .then((resp) => scraper(resp.data));

    scrapedData = new ScrapedData({
      data,
      createdAt: new Date()
    });

    await scrapedData.save();
  }

  axios.post(`https://hooks.slack.com/services/${process.env.SLACK_SECRET}`, {
    text: scrapedData.data
  });

  const { data, createdAt } = scrapedData;
  res.send({
    data,
    createdAt
  });
};

export default handleErrorMiddleware(typeform);
