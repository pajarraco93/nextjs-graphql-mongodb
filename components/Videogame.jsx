import Link from 'next/link';

const VideoGame = ({ game, inList = false }) => (
  <li>
    <h2>{game.name}</h2>
    <p>{game.score}</p>
    <p>{game.genre}</p>
    <p>{game.platform}</p>
    {inList && (
      <Link href={`/videogames/${game.id}`}>
        <button type="button">Edit info</button>
      </Link>
    )}
  </li>
);

export default VideoGame;
