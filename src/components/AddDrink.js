import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'


export class AddDrink extends Component {
    render() {
        return (
            <div>
                <Modal show={this.props.show} onHide={this.props.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add a Drink</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={(e) => this.props.submitAddDrinkForm(e)}>
                            <Form.Group className="mb-3" controlId="">
                                <Form.Label>strDrink</Form.Label>
                                <Form.Control name="title" type="text" placeholder="Enter Drink" />
                                <Form.Text className="text-muted">
                                    Add your fav Drink
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="">
                                <Form.Label>Image</Form.Label>
                                <Form.Control name="image" type="url" placeholder="image URL" />
                            </Form.Group>

                            <Button  variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>


                    </Modal.Body>
                    <Modal.Footer>
                        {/* <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Save Changes
                        </Button> */}
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default AddDrink
