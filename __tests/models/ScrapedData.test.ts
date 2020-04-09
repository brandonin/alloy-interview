import request from 'supertest';
import mockingoose from 'mockingoose';
import app from '../../src/app';
import ScrapedData from '../../src/models/ScrapedData';

describe('test mongoose User model', () => {
  test('should return the doc with findById', () => {
    const _doc = {
      _id: '507f191e810c19729de860ea',
      data: 'some header data',
      createdAt: '1586390211625'
    };

    mockingoose(ScrapedData).toReturn(_doc, 'findOne');

    return ScrapedData.findById({ _id: '507f191e810c19729de860ea' }).then(doc => {
      expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
    });
  });
});
