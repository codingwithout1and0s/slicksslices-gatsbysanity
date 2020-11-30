import React from 'react';
import useLatestData from '../utils/useLatestData';
import { HomePageGrid } from '../styles/Grids';
import LoadingGrid from '../components/LoadingGrid';
import ItemGrid from '../components/ItemGrid';

function CurrentlyWorking({ pizzamakers }) {
  return (
    <div>
      <h2 className="center">
        <span className="mark tilt">Currently Working</span>
      </h2>
      <p>Standing by, ready to grab you a slice</p>
      {!pizzamakers && <LoadingGrid count={4} />}
      {pizzamakers && !pizzamakers?.length && (
        <p>No one is working right now!</p>
      )}
      {pizzamakers?.length && <ItemGrid items={pizzamakers} />}
    </div>
  );
}

function HotSlices({ hotSlices }) {
  return (
    <div>
      <h2 className="center">
        <span className="mark tilt">Ready In The Case</span>
      </h2>
      <p>Come on by, buy a slice!</p>
      {!hotSlices && <LoadingGrid count={4} />}
      {hotSlices && !hotSlices?.length && <p>Nothing's ready in the case!</p>}
      {hotSlices?.length && <ItemGrid items={hotSlices} />}
    </div>
  );
}

export default function HomePage() {
  const { pizzamakers, hotSlices } = useLatestData();

  return (
    <div className="center">
      <h1>The Best Pizza Downtown!</h1>
      <p>Open 11am to 11pm Every Single Day</p>
      <HomePageGrid>
        <CurrentlyWorking pizzamakers={pizzamakers} />
        <HotSlices hotSlices={hotSlices} />
      </HomePageGrid>
    </div>
  );
}
