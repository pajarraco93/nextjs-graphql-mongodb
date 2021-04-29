import connectDB from '../../utils/mongodb';
import VideoGame from '../../data-models/game';

const CreateVideoGame = async (data) => {
  const game = await VideoGame(data);
  const gameCreated = await game.save();

  return gameCreated;
};

export default connectDB(CreateVideoGame);
