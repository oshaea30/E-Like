import React, {useState, useEffect } from 'react'
import TinderCard from 'react-tinder-card'
import './TinderCards.css'



function TinderCards() {
    const [people, setPeople] = useState ([
      {
        name: 'Sarah A',
        url: 
          "https://singapore-grlk5lagedl.stackpathdns.com/production/singapore/images/1609827493259134-modelo.jpg?w=1920&h=800&fit=fill&crop=faces&auto=%5B%22format%22%2C%20%22compress%22%5D&cs=srgb"
      },
      {
        name: 'Alyssa B',
        url: 
          "https://www.toptrendsguide.com/wp-content/uploads/2020/07/Most-Beautiful-Black-Women.jpg"
      },
    ]);

    useEffect(() => {


    }, [people]);

    return (
      <div>
        <h1>Elike cards</h1>
        <div className="tinderCards_cardContainer">
          {people.map((person) => ( 
          <TinderCard
            className="swipe"
            key={person.name}
            preventSwipe={['up', 'down']}
          >
            <div 
              style= {{ backgroundImage: `url(${person.url})` }}
              className="card"
            >
              <h3>{person.name}</h3>
            </div>
          </TinderCard>
        ))}
      </div>

        </div>


    );
}

export default TinderCards;
