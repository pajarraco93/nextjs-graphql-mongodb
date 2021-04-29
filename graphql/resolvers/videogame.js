import { ObjectID } from 'mongodb';

import connectDB from '../../utils/mongodb';
import VideoGame from '../../data-models/game';

const VideoGames = async (data) => VideoGame.findOne({
  _id: ObjectID(data.id),
});

export default connectDB(VideoGames);
