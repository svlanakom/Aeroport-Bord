const baseUrl = "https://api.iev.aero/api/flights";

export const fetchFlightList = (date) =>
  fetch(`${baseUrl}/${date}`).then((res) => {
    if (res.ok) {
      return res.json();
    }
    throw new Error("Something wrong...");
  });
