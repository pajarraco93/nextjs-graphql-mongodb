import { useRef } from 'react';
import { useRouter } from 'next/router';

import graphqlQuerier from '../utils/graphqlQuerier';

const createVideoGame = async function (name, genre, platform, score) {
  return JSON.stringify({
    query: `mutation {
      createVideogame(
            name: "${name}"
            genre: "${genre}"
            platform: "${platform}"
            score: ${score}
      ) { id, name, genre, platform, score }
    }`,
  });
};

const updateVideoGame = async function (id, name, genre, platform, score) {
  return JSON.stringify({
    query: `mutation {
      updateVideogame(
            id: "${id}"
            name: "${name}"
            genre: "${genre}"
            platform: "${platform}"
            score: ${score}
      ) { id, name, genre, platform, score }
    }`,
  });
};

const deleteVideoGame = async function (id) {
  return JSON.stringify({
    query: `mutation {
      deleteVideogame(
            id: "${id}"
      )
    }`,
  });
};

const VideoGameInput = ({ game = {}, updateButton = false, deleteButton = false }) => {
  const formRef = useRef();
  const router = useRouter();

  const createGame = async () => {
    const form = formRef.current;

    return graphqlQuerier(await createVideoGame(
      form.name.value,
      form.genre.value,
      form.platform.value,
      form.score.value,
    ));
  };

  const updateGame = async () => {
    const form = formRef.current;

    return graphqlQuerier(await updateVideoGame(
      game.id,
      form.name.value,
      form.genre.value,
      form.platform.value,
      form.score.value,
    ));
  };

  const deleteGame = async () => {
    await graphqlQuerier(await deleteVideoGame(game.id));
    router.replace('/videogames');
  };

  return (
    <form ref={formRef}>
      <label htmlFor="name">Name:</label>
      <br />
      <input type="text" id="name" defaultValue={game.name} />
      <br />
      <label htmlFor="genre">Genre:</label>
      <br />
      <input type="text" id="genre" defaultValue={game.genre} />
      <br />
      <label htmlFor="platform">Platform:</label>
      <br />
      <input type="text" id="platform" defaultValue={game.platform} />
      <br />
      <label htmlFor="score">Score:</label>
      <br />
      <input type="number" id="score" defaultValue={game.score} />
      <br />
      <br />
      {!updateButton && (
        <div>
          <button onClick={createGame}>Create</button>
        </div>
      )}
      {updateButton && (
        <div>
          <button onClick={updateGame}>Update</button>
        </div>
      )}
      {deleteButton && (
        <div>
          <button type="button" onClick={deleteGame}>Delete</button>
        </div>
      )}

    </form>
  );
};

export default VideoGameInput;
