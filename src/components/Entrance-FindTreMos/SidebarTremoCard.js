import React from "react";
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button';

const SidebarTremoCard = ({tremo}) => {
    return (
      <Row className='justify-content-center'>
      <Card style={{width: '80%'}}>
      
      {
        tremo ? (
        <Card.Body>
          <Card.Title className='text-dark'>{tremo.name} is {tremo.distanceFromTremo.toFixed(3)} km away</Card.Title>
           <Card.Text>
            {tremo.hint}
          </Card.Text>
        </Card.Body>
        ) : (
        <Card.Body>
          <Card.Title className='text-dark'>Add a tremo to the hunt!</Card.Title>
        </Card.Body>

        )
      }
      </Card>
      </Row>
    )
};

export default SidebarTremoCard;