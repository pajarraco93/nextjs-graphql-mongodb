import { ObjectID } from 'mongodb';

import connectDB from '../../utils/mongodb';
import VideoGame from '../../data-models/game';

const DeleteVideoGame = async (data) => {
  if (data.id !== undefined) {
    const res = await VideoGame.deleteOne(
      { _id: ObjectID(data.id) },
    );

    return res.ok;
  }

  return {};
};

export default connectDB(DeleteVideoGame);
