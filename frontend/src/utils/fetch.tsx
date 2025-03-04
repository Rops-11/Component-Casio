export const normalFetch = async (
  route: string,
  method: string,
  body?: object
) => {
  const response = await fetch(`${import.meta.env.VITE_SERVER_URL}${route}`, {
    method: method.toUpperCase(),
    headers: {
      "Content-type": "application/json",
    },
    body: body ? JSON.stringify(body) : null,
  });

  return response;
};
