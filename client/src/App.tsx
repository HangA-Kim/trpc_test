// import { useEffect } from "react";
// import { trpc } from "./trpc";

import { useState } from "react";
import { trpc } from "./trpc";

function App() {
  // const fetchUser = async () => {
  //   const user = await trpc.user.getUserById.query("0");
  //   console.log(user);
  // };

  // useEffect(() => {
  //   fetchUser();
  // }, []);
  // return <></>;

  // const { data, isLoading } = trpc.user.getUserById.useQuery("0");
  // if (isLoading) return <div>Loading....</div>;
  // else <div>{data?.name}</div>;

  // const { data, isLoading } = trpc.user.getUsers.useQuery();
  // if (isLoading) return <span>loading...</span>;

  // return (
  //   <div>
  //     <ul>
  //       {data?.map((user) => (
  //         <li key={user.id}>{user.name}</li>
  //       ))}
  //     </ul>
  //   </div>
  // );

  const [name, setName] = useState("");
  const { data, isLoading, refetch } = trpc.user.getUsers.useQuery();
  const mutation = trpc.user.createUser.useMutation({
    onSuccess: () => refetch(),
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSumit = (event: React.FormEvent<HTMLFormElement>) => {
    setName("");
    mutation.mutate({ name });
    event.preventDefault();
  };

  if (isLoading) return <span>Loading ...</span>;

  return (
    <div>
      <ul>
        {data?.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>

      <form onSubmit={handleSumit}>
        <label htmlFor="name">Name:</label>
        <input id="name" type="text" value={name} onChange={handleChange} />

        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default App;
