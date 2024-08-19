export const BASE_URL = "http://localhost:5000/api";

export const postRequest = async (
  url: string,
  body: BodyInit | null | undefined,
) => {
  const response = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });
  const result = await response.json();
  return result;
};

export const getRequest = async (url: string, token?: string | null) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();
    return result;
  } catch (error: Error | any) {
    console.error("Failed to fetch:", error);
    return { error: error?.message };
  }
};
