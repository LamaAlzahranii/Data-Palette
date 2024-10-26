import type { PageLoad } from "./$types";

export const load = (async ({ fetch }) => {
  async function fetchUsers() {
    const result = await fetch(
      "https://dummyjson.com/users?select=age,firstName,lastName,weight,height&limit=10"
    );
  }

  
}) satisfies PageLoad;
