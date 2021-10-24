export default podcast => {
  const episodes = podcast.episodes.slice().reverse().map(episode => {
    return `
        <li class="episode">
          <h3 class="title">${episode.title}</h3>
          <p class="description">${episode.description}</p>
          <a class="download" href="${episode.file}">Download mp3 audio</a>
          <div class="stream">
            <span>Stream:</span>
            <audio controls>
              <source src="${episode.file}" type="audio/mpeg">
              Your browser does not support embedded audio.
            </audio>
          </div>
        </li>`.trim();
  }).join("");

  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>${podcast.name}</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body>
    <header>
      <h1>${podcast.name}</h1>
    </header>
    <main>
      <h2>Episodes</h2>
      <ol reversed>
        ${episodes}
      </ol>
    </main>
    <footer>
    </footer>
  </body>
</html>`.trim();
};
