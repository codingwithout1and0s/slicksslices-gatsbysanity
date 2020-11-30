import React from 'react';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
import SEO from '../components/SEO';
import Pagination from '../components/Pagination';

const PizzaMakerGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;

const PizzaMakerStyles = styled.div`
  a {
    text-decoration: none;
  }
  .gatsby-image-wrapper {
    height: 400px;
  }
  h2 {
    transform: rotate(-2deg);
    text-align: center;
    font-size: 4rem;
    position: relative;
    z-index: 2;
  }
  .description {
    background: var(--yellow);
    padding: 1rem;
    margin: 2rem;
    margin-top: -6rem;
    position: relative;
    z-index: 2;
    tranform: rotate(1deg);
    text-align: center;
  }
`;

export default function PizzaMakersPage({ data, pageContext }) {
  const pizzamakers = data.pizzamakers.nodes;
  return (
    <>
      <SEO title={`Slicemasters - Page ${pageContext.currentPage || 1}`} />
      <Pagination
        pageSize={parseInt(process.env.GATSBY_PAGE_SIZE)}
        totalCount={data.pizzamakers.totalCount}
        currentPage={pageContext.currentPage || 1}
        skip={pageContext.skip}
        base="/pizzamakers"
      />
      <PizzaMakerGrid>
        {pizzamakers.map((person) => (
          <PizzaMakerStyles>
            <Link to={`/pizzamaker/${person.slug.current}`}>
              <h2>
                <span className="mark">{person.name}</span>
              </h2>
            </Link>
            <Img fluid={person.image.asset.fluid} />
            <p className="description">{person.description}</p>
          </PizzaMakerStyles>
        ))}
      </PizzaMakerGrid>
    </>
  );
}

export const query = graphql`
  query($skip: Int = 0, $pageSize: Int = 4) {
    pizzamakers: allSanityPerson(limit: $pageSize, skip: $skip) {
      totalCount
      nodes {
        name
        id
        slug {
          current
        }
        description
        image {
          asset {
            fluid(maxWidth: 410) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;