const BASE_URL = "https://api.github.com/users";

async function githubRequest(url) {
  const response = await fetch(url, { headers: { Accept: "application/vnd.github+json" } });
  if (response.status === 404) throw new Error("GitHub user not found. Check the username and try again.");
  if (response.status === 403) throw new Error("GitHub API rate limit reached. Please wait a little and try again.");
  if (!response.ok) throw new Error("Unable to fetch GitHub data. Please try again.");
  return response.json();
}

export function getGithubUser(username) {
  return githubRequest(`${BASE_URL}/${encodeURIComponent(username.trim())}`);
}

// Fetch up to 100 public repositories so charts and repository insights use a larger sample.
export function getGithubRepos(username) {
  return githubRequest(`${BASE_URL}/${encodeURIComponent(username.trim())}/repos?sort=updated&per_page=100&type=owner`);
}
