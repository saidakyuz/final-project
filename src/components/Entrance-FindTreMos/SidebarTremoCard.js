import React from "react";
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button';

const SidebarTremoCard = ({tremo}) => {
    return (
      <Row /*className='justify-content-center'*/ classname="align-items : flex-end">
      <Card style={{width: '60%'}} className="MessageInEntranceSidebar">
      
      {
        tremo ? (
        <Card.Body className="MessageInEntranceSidebar">
          <Card.Title className="MessageInEntranceSidebar" /*className='text-dark'*/>{tremo.name} is {tremo.distanceFromTremo.toFixed(3)} km away.</Card.Title>
           <Card.Text className="MessageInEntranceSidebar">
            {tremo.hint}
          </Card.Text>
        </Card.Body>
        ) : (
        <Card.Body>
          <Card.Title className="MessageInEntranceSidebar">Add a Tremo to the hunt!</Card.Title>
        </Card.Body>

        )
      }
      </Card>
      </Row>
    )
};

export default SidebarTremoCard;