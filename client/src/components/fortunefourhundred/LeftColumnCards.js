import React from 'react'
import OneCard from './OneCard'


const LeftColumnCards = ({ Container, filteredBillionaires, billionaires }) => {
  return (
    <Container className='card-list' >
      {(filteredBillionaires.length ? filteredBillionaires : billionaires).map(billionaire => {
        return (
          <OneCard key={billionaire.uri} billionaire={billionaire} squareImage={billionaire.squareImage} personName={billionaire.personName} finalWorth={billionaire.finalWorth} />
        )
      })}
    </Container>


  )
}

export default LeftColumnCards