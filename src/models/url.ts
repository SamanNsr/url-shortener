import { Document, Schema, Model, model } from 'mongoose';
// An interface that describes the properties
// that are required to create a new Url
interface UrlAttrs {
  slug: string;
  url: string;
}

// An interface that describes the properties
// that a Url Model has
interface UrlModel extends Model<UrlDoc> {
  build(attrs: UrlAttrs): UrlDoc;
}

// An interface that describes the properties
// that a Url Document has
interface UrlDoc extends Document {
  slug: string;
  url: string;
}

const urlSchema = new Schema(
  {
    slug: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

urlSchema.pre('save', async function (done) {
  done();
});

urlSchema.statics.build = (attrs: UrlAttrs) => {
  return new Url(attrs);
};

const Url = model<UrlDoc, UrlModel>('Url', urlSchema);

export { Url };
