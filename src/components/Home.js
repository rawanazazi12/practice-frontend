import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

export class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            drinks: []
        }
    }

    componentDidMount = async () => {
        await axios.get(`${process.env.REACT_APP_SERVER}/allData`).then(response => {
            this.setState({
                drinks: response.data
            });
            console.log(response.data)
        }).catch(error =>console.log(error.message))
    };
    addToFav=async(item)=>{
        const reqBody={
            strDrink:item.strDrink,
            strDrinkThumb:item.strDrinkThumb
        }
      await axios.post(`${process.env.REACT_APP_SERVER}/fav`,reqBody)
    }

    render() {
        return (
            <div>
                <h1>
                    Hot / Cold DRINKS
                </h1>
                <br/>
                <br/>
                <Row xs={1} md={3}>
                    {
                        this.state.drinks.map(item => {
                            return (
                                <Col  lg={3} xs="auto">
                                    <Card style={{ width: '12rem', height:'22rem', marginBottom: "30px",marginLeft:'2rem' }}>
                                        <Card.Img  style={{ width: '12rem', marginBottom: "30px" }} variant="top" src={item.strDrinkThumb} />
                                        <Card.Body>
                                            <Card.Title style={{fontSize:'16px'}}>{item.strDrink}</Card.Title>
                                            <Button variant="primary" onClick={() => this.addToFav(item)}>Add to favorite</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>

                            )
                        })
                    }
                </Row>

            </div>
        )
    }
}

export default Home
