import { withAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import React, { Component } from 'react'
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import AddDrink from "./AddDrink";
import UpdateDrink from "./UpdateDrink";

export class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showUpdateModal: false,
            showAdd:false,
            favDrinks: []
        }
    }

    componentDidMount = async () => {
        axios.get(`${process.env.REACT_APP_SERVER}/fav`).then(axiosRes => {
            this.setState({
                favDrinks: axiosRes.data
            })
        }).catch(error => console.log(error.message))
    }
    deleteDrink = async (id) => {
        await axios.delete(`${process.env.REACT_APP_SERVER}/fav/${id}`).then(axiosRes => {
            if (axiosRes.data.ok !== 0) {
                const newDrinksArr = this.state.favDrinks.filter(drink => drink._id !== id);
                this.setState({
                    favDrinks: newDrinksArr
                })

            }

        }).catch(error => console.log(error.message))
    }
    handleModal = () => {
        this.setState({
            showUpdateModal: !this.state.showUpdateModal
        });
    }
    submitForm = (e) => {
        e.preventDefault();

    }

    handleAddModal=()=>{
        this.setState({
            showAdd: !this.state.showAdd
        })
    }
    render() {
        const { user, isAuthenticated } = this.props.auth0;
        return (
            isAuthenticated && (
                <div>

                    <Container>
                        <img src={user.picture} alt={user.name} />
                        <h2>{user.name} </h2>
                        <p>{user.email}</p>
                    </Container>
                    <Button onClick={()=>this.handleAddModal}>
                        Add
                    </Button>
                    {
                        this.state.showAdd &&
                        <AddDrink
                        show={this.state.showAdd}
                        handleClose={this.handleAddModal}
                        submitAddDrinkForm={this.submitAddDrinkForm}

                        />
                    }
                    <Row>
                        {
                            this.state.favDrinks.map(drink => {
                                return (
                                    <Col lg={3}>
                                        <Card style={{ width: '13rem' }}>
                                            <Card.Img src={drink.strDrinkThumb} style={{ width: '13rem' }} />

                                            <Card.Body>
                                                <Card.Title>
                                                    {drink.strDrink}
                                                </Card.Title>
                                                <Button onClick={() => this.deleteDrink(drink._id)}> Delete

                                                </Button>
                                                <Button onClick={() => this.handleModal}> Update

                                                </Button>
                                                {
                                                    this.state.showUpdateModal &&
                                                    <UpdateDrink
                                                        show={this.state.showUpdateModal}
                                                        handleClose={this.handleModal}
                                                        submitForm={this.submitForm}


                                                    />
                                                }

                                            </Card.Body>
                                        </Card>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </div>
            )
        )

    }
}
export default withAuth0(Profile)


