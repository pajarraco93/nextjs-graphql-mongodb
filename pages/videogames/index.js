import VideoGame from '../../components/Videogame';
import graphqlQuerier from '../../utils/graphqlQuerier';

const VideoGames = ({ data }) => (
  <div>
    <h1>Current VideoGames in our DataBase</h1>
    <ul>
      {data && data.videogames.map((game) => (
        <VideoGame game={game} inList key={game.id} />
      ))}
    </ul>
  </div>
);

export async function getServerSideProps() {
  const query = JSON.stringify({ query: '{ videogames { id, name, genre, score, platform } }' });
  const data = await graphqlQuerier(query);

  return {
    props: { data },
  };
}

export default VideoGames;
