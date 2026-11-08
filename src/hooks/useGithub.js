import { useState } from "react";
import { getGithubUser } from "../services/githubApi";

export default function useGithub() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function searchUser(username) {
    if (!username.trim()) return;

    setLoading(true);
    setError("");

    try {
      const data = await getGithubUser(username);
      setUser(data);
    } catch (err) {
      setUser(null);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return {
    user,
    loading,
    error,
    searchUser,
  };
}
