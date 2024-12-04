AOS.init({
  duration: 1000,
  once: true,
});

const fetchGitHubProjects = async () => {
  const username = "Valyxp";
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos`
    );
    const repos = await response.json();

    const projectCards = document.getElementById("project-cards");

    const starredRepos = repos.filter((repo) => repo.stargazers_count > 0);

    starredRepos.forEach((repo, index) => {
      const card = document.createElement("div");
      card.className = "col-md-4 mb-4";
      card.setAttribute("data-aos", "fade-up");
      card.setAttribute("data-aos-delay", `${index * 100}`);

      card.innerHTML = `
                <div class="card h-100 shadow">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${repo.name}</h5>
                        <p class="card-text flex-grow-1">${
                          repo.description || "Sin descripción"
                        }</p>
                        <p class="card-text"><small class="text-muted">⭐ ${
                          repo.stargazers_count
                        }</small></p>
                        <a href="${
                          repo.html_url
                        }" class="btn btn-custom mt-auto" target="_blank">Ver proyecto</a>
                    </div>
                </div>
            `;

      projectCards.appendChild(card);
    });
  } catch (error) {
    console.error("Error fetching GitHub projects:", error);
  }
};

fetchGitHubProjects();
