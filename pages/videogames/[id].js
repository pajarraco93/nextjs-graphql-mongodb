import VideoGame from '../../components/Videogame';
import VideoGameInput from '../../components/VideogameInput';
import graphqlQuerier from '../../utils/graphqlQuerier';

const VideoGames = ({ data }) => (
  <div>
    <ul>
      {data.videogame && (
        <div>
          <VideoGame game={data.videogame} />
          <VideoGameInput game={data.videogame} updateButton deleteButton />
        </div>
      )}
    </ul>
  </div>
);

export async function getServerSideProps(context) {
  const query = JSON.stringify({ query: `{ videogame(id: "${context.params.id}") { id, name, genre, score, platform } }` });
  const data = await graphqlQuerier(query);

  return {
    props: { data },
  };
}

export default VideoGames;
