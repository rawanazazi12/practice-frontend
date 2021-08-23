import React, { Component } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import AddDrink from './AddDrink';
import UpdateDrink from './UpdateDrink';

export class Favourite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddModal: false,
            showUpdateModal: false,
            favDrinks: [],
            drinkObj: {}
        }
    }

    componentDidMount = async () => {
        await axios.get(`${process.env.REACT_APP_SERVER}/fav`).then(response => {
            this.setState({
                favDrinks: response.data
            })
            console.log(this.state.favDrinks);
        }).catch(error => console.log(error.message))
    }

    deleteItem = async (id) => {
        await axios.delete(`${process.env.REACT_APP_SERVER}/fav/${id}`).then(response => {
            if (response.data.ok !== 0) {
                let newDrinksArr = this.state.favDrinks.filter(item => item._id !== id);
                this.setState({
                    favDrinks: newDrinksArr
                });

            }
        }).catch(error => console.log(error.message));

    }

    handleAddModal = () => {
        this.setState({
            showAddModal: !this.state.showAddModal
        })
    }

    submitAddDrinkForm(e) {
        e.preventDefault();
        const body = {
            strDrink: e.target.title.value,
            strDrinkThumb: e.target.image.value
        }
        axios.post(`${process.env.REACT_APP_SERVER}/favDrink`, body).then(axiosRes => {
            this.state.favDrinks.push(axiosRes.data);
            this.setState({
                favDrinks: this.state.favDrinks
            });
            this.handleAddModal({})
        }).catch(error => console.log(error.message))
    }
    handleUpdateModal = (drinkObj) => {
        this.setState({
            showUpdateModal: !this.state.showUpdateModal,
            drinkObj: drinkObj
        })
    }

    submitUpdateDrinkForm = (e) => {
        e.preventDefault();
        const id=this.state.drinkObj._id;
        const body = {
            strDrink: e.target.title.value,
            strDrinkThumb: e.target.image.value
        }
        axios.put(`${process.env.REACT_APP_SERVER}/fav/${id}`, body).then(axiosRes => {
            this.handleUpdateModal({})
        }).catch(error => console.log(error.message))
    }
    render() {
        return (
            <div>
                <h1>
                    Favourite Drinks
                </h1>
                <Button onClick={this.handleAddModal}>
                    Add A drink
                </Button>
                {
                    this.state.showAddModal &&
                    <AddDrink
                        show={this.state.showAddModal}
                        handleClose={this.handleAddModal}
                        submitAddDrinkForm={this.submitAddDrinkForm}


                    />

                }

                <Row>
                    {this.state.favDrinks.map(item => {
                        return (
                            <Col lg={3}>
                                <Card style={{ width: "12rem", height: '22rem', marginBlock: "2rem", marginLeft: '2rem' }}>
                                    <Card.Img src={item.strDrinkThumb} />
                                    <Card.Body>
                                        <Card.Title>
                                            {item.strDrink}
                                        </Card.Title>
                                        <Button variant='primary' onClick={() => this.deleteItem(item._id)}>
                                            Delete
                                        </Button>
                                        <Button onClick={this.handleUpdateModal}>
                                            Update
                                        </Button>
                                        {
                                            this.state.showUpdateModal &&
                                            <UpdateDrink
                                                show={this.state.showUpdateModal}
                                                handleClose={this.handleUpdateModal}
                                                submitUpdateDrinkForm={this.submitUpdateDrinkForm}
                                                drinkObj={this.state.drinkObj}
                                                name={item.strDrink}
                                                image={item.strDrinkThumb}
                                                // favDrinks={this.state.favDrinks}
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
    }
}

export default Favourite
