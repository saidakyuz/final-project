import React from 'react';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const SidebarTremoCard = ({ tremo }) => {
  return (
    <Row className='justify-content-center'>
      <Card style={{ width: '80%' }}>
        {tremo ? (
          <Card.Body>
            {tremo.distanceFromTremo <= 0.01 && <Card.Img variant='top' src={tremo.picture} />}
            <Card.Title className='text-dark'>
              {tremo.name} is {tremo.distanceFromTremo.toFixed(3)} km away
            </Card.Title>
            <Card.Text>{tremo.hint}</Card.Text>
            {tremo.distanceFromTremo <= 0.01 && (
              <Button variant='dark' block>
                Save to chest
              </Button>
            )}
          </Card.Body>
        ) : (
          <Card.Body>
            <Card.Title className='text-dark'>Add a tremo to the hunt!</Card.Title>
          </Card.Body>
        )}
      </Card>
    </Row>
  );
};

export default SidebarTremoCard;
