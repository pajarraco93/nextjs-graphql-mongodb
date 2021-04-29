import { ObjectID } from 'mongodb';
import { pickBy, identity } from 'lodash';

import connectDB from '../../utils/mongodb';
import VideoGame from '../../data-models/game';

const UpdateVideoGame = async (data) => {
  if (data.id !== undefined) {
    const updates = pickBy(data, identity);
    const options = { new: true };

    return VideoGame.updateOne(
      { _id: ObjectID(data.id) },
      updates,
      options,
    );
  }

  return {};
};

export default connectDB(UpdateVideoGame);
