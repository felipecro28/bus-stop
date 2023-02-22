import axios from "axios";

const apiKey = process.env.API_KEY || "";

export interface IBusResponse {
  results: [
    {
      position: {
        lat: number;
        lon: number;
      };
      address: {
        streetName: string;
        municipalitySubdivision: string;
        municipality: "Rio de Janeiro";
        freeformAddress: "Rua Doutor Satamini, 20270-232, Rio de Janeiro";
      };
      poi: {
        name: string;
      };
    }
  ];
}

export const getBusStop = (latitude: number, longitude: number) => {
  const url = `https://api.tomtom.com/search/2/categorySearch/busstop.json?key=${apiKey}&lat=${latitude}&lon=${longitude}&radius=10200`;
  return axios.get<IBusResponse>(url);
};
