import React, {useContext} from 'react';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { AuthContext } from "../../context/AuthContext";
import {db} from '../../firebase/firebase'

 
const SidebarTremoCard = ({ tremo, setActiveHunt }) => {
  const { user } = useContext(AuthContext);
  const saveToChest = ()=>{
    const chest = db.collection('chest').doc();
    chest.set(
      {...tremo, user_id: user.uid}
    )
    setActiveHunt()
  }

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
              <Button variant='dark' block onClick={saveToChest}>
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
