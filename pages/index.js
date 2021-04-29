import Link from 'next/link';
import VideoGameInput from '../components/VideogameInput';

const Home = () => (
  <div>
    <h1>Welcome to your personal videogame database</h1>
    <div>
      <h2>List all the videogames: </h2>
      <Link href="/videogames">
        <button type="button">List videogames</button>
      </Link>
      <h2>Introduce a new videogame: </h2>
      <VideoGameInput action="create" />
    </div>
  </div>
);

export default Home;
