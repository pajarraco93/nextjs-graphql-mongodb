import connectDB from '../../utils/mongodb';
import VideoGame from '../../data-models/game';

const VideoGames = async () => VideoGame.find();

export default connectDB(VideoGames);
