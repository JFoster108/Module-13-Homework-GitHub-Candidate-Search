const searchGithub = async () => {
  const start = Math.floor(Math.random() * 100000000) + 1;
  try {
    const response = await fetch(
      `https://api.github.com/users?since=${start}`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Invalid API response');
    }

    const users = await response.json();

    // Fetch detailed user data
    const detailedUsers = await Promise.all(
      users.map(async (user: any) => {
        const userDetails = await fetch(user.url, {
          headers: { Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}` },
        }).then((res) => res.json());

        return {
          id: userDetails.id,
          login: userDetails.login,
          avatar_url: userDetails.avatar_url,
          name: userDetails.name || 'No Name Available',
          location: userDetails.location,
          email: userDetails.email,
          company: userDetails.company,
          html_url: userDetails.html_url,
        };
      })
    );

    return detailedUsers;
  } catch (err) {
    console.error('Error fetching data:', err);
    return [];
  }
};

export { searchGithub };
