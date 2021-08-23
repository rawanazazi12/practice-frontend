import React, { Component } from 'react'
import { Modal,Form,Button } from 'react-bootstrap'

export class UpdateData extends Component {
    render() {
        return (
            <div>
                <Modal show={this.props.show} onHide={this.props.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Data</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={(e)=>this.props.submitForm}>
                            <Form.Group className="mb-3" controlId="">
                                <Form.Label>Fav Drink</Form.Label>
                                <Form.Control type="text" placeholder="Enter A Drink" />
                              
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="">
                                <Form.Label>Image </Form.Label>
                                <Form.Control type="url" placeholder="image url" />
                            </Form.Group>
                           
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Modal.Body>

                </Modal>
            </div>
        )
    }
}

export default UpdateData
