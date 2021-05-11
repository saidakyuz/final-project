import React, {useEffect, useState, useContext} from "react";
import { AuthContext } from "../../context/AuthContext";
import {db} from '../../firebase/firebase'
import Sidebar from "../Entrance-FindTreMos/Sidebar";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import user_like_staff_office_idea from "../../assets/user_like_staff_office_idea.png";
import diamound_shine_expensive_stone from "../../assets/diamound_shine_expensive_stone.png";
import marketing_Business_idea_pertinent_Gear from "../../assets/marketing_Business_idea_pertinent_Gear.png";


const TreasureChest = () => {
    const { user } = useContext(AuthContext);
    const [tremosInChest, setTremosInChest]= useState()
    useEffect(()=>{
      const chestUnsubscribe = db
    .collection('chest')
    .where('user_id', '==', user.uid)
    .onSnapshot(querySnapshot => {
      const tremos = querySnapshot.docs.map(doc => doc.data());
      setTremosInChest(tremos)
    });

    return ()=>chestUnsubscribe()
    })
    return (
       <div id="BackgroundChest">
 <div style={{ display: "flex", flexDirection: "row-reverse" }}>
          <Sidebar
            width={555}
            height={"90vh"}
          >
            <div id="TreasureChestSidebarContainer">
              <div id="TreasureChestSidebarItemIcons">
              <Link to="/entrancegate">
                <button className="SidebarIconsButtons">
                <img
                src={user_like_staff_office_idea}
                alt="Entrance Gate"
                width="65px"
                /></button>
              </Link>
              <Link to="/createatremo">
                <button className="SidebarIconsButtons">
                <img
                  src={diamound_shine_expensive_stone}
                  alt="Create Tremo"
                  width="65px"
                /></button>
                {/* <span className="createATremo">Create a TreMo</span> */}
              </Link>
              <Link to="/helpinspirations">
                <button className="SidebarIconsButtonsRight">
                <img 
                src={marketing_Business_idea_pertinent_Gear}
                alt="HelpInspirations"
                width="65px" 
                /></button>
              </Link>
              </div>
              <div id="TreasureChestSidebarItem">
              </div>
            </div>
          </Sidebar>
        </div>
        <Container>
            <Row>
            {
              tremosInChest && tremosInChest.map(tp => (
                
                <Col md={3}>
                <Card style={{ width: '80%' }}>
                  {tp ? (
                    <Card.Body>
                      <Card.Img variant='top' src={tp.picture} />
                      <Card.Title className='text-dark'>
                        {tp.name}
                      </Card.Title>
                      <Card.Text>{tp.hint}</Card.Text>
                    </Card.Body>
                  ) : (
                    <Card.Body>
                      <Card.Title className='text-dark'>Add a tremo to the hunt!</Card.Title>
                    </Card.Body>
                  )}
                </Card>
                </Col>

                ))
          }
          </Row> 
        </Container>
       </div>
      );
    };
    
    export default TreasureChest;