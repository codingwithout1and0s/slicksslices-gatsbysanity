import { useState, useEffect } from 'react';

const gql = String.raw;

const deets = `
    name
    _id
    image {
      asset {
        url
        metadata {
          lqip
        }
      }
    }
`;

export default function useLatestData() {
  // Pizzamakers
  const [pizzamakers, setPizzamakers] = useState();
  // Hot Slices
  const [hotSlices, setHotSlices] = useState();

  // Use a side effect to fetch data from graphql endpoint
  useEffect(function () {
    // when the component loads, fetch the data
    fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: gql`
          query {
            StoreSettings(id: "downtown") {
              name
              pizzamaker {
                ${deets}
              }
              hotSlices {
                ${deets}
              }
            }
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        // TODO: checl for errors
        // set the data to state
        setHotSlices(res.data.StoreSettings.hotSlices);
        setPizzamakers(res.data.StoreSettings.pizzamakers);
      });
  }, []);
  return {
    hotSlices,
    pizzamakers,
  };
}
