import {
  Document,
  Model,
  Schema,
  model
} from 'mongoose';

export interface IScrapedData extends Document {
    data: string;
}

interface IScrapedDataModel extends Model<IScrapedData> {}

const schema = new Schema({
  data: { type: String, required: true },
  createdAt: { type: Number, required: true }
});

const ScrapedData: IScrapedDataModel = model<IScrapedData, IScrapedDataModel>(
  'ScrapedData',
  schema
);

export default ScrapedData;
