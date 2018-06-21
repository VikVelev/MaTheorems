import React, { Component } from 'react'
import { Segment, Header, Form, Button, Message } from 'semantic-ui-react'
import { addTheorem } from './actions/actions'
import {connect} from 'react-redux'

@connect((store) => {
    return {
        state: store.stateManager
    }
})
export default class Add extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initialCommit: false,
            title: "",
            description: "",
            type: "3d",
        }
    }
    
    handleChange = (e, { name, value }) => {
        if (name === "type") {
            if(this.state.type === "3d") {
                this.setState({ type: "2d" })
                setTimeout(() => dispatchEvent(new Event('ggb-add-2d-loaded')), 1000);
            } else {
                this.setState({ type: "3d" })
                setTimeout(() => dispatchEvent(new Event('ggb-add-loaded')), 1000);
            }
        } else {
            this.setState({ [name]: value })
        }
    }
    
    
    componentDidMount(){
        dispatchEvent(new Event('ggb-add-loaded'))
    }

    handleErrors(type) {
        if (this.props.state.error.response) {
            if (this.props.state.error.response.data[type] !== undefined) {
                return (
                    <Message attached="bottom" color="red">
                        {this.props.state.error.response.data[type]}
                    </Message>
                )
            }
        }
    }

    handleSubmit = (e) => {        
        let formSubmit = {}
        let token = ""
        let name = ""
        let ggbFile64 = window.ggbApplet.getBase64()
        

        console.log(ggbFile64)
        this.props.dispatch(
            addTheorem(
                token,
                name,
                ggbFile64,
            )
        )
    }

    types = [{
            text: "3D",
            value: "3d"
        },{
            text: "2D",
            value: "2d"
        }
    ]

    render(){
        return (
            <Segment className="addTheorem form">
            <Header size="huge">Добавете Теорема</Header>
                <Form size='large' name="add_model" onSubmit={this.handleSubmit}>
                    <Segment stacked>
                        <Header>Чертеж</Header>
                        <Header>Име на теорема</Header>
                        <div className="topRow">
                        <Form.Input
                            placeholder="Име"
                            className="textinput"
                            value={this.state.title}
                            onChange={this.handleChange}
                            error={this.handleErrors("title") ? true : false}                            
                            type="text"
                            name="title"
                        />

                        {this.handleErrors("title")}
                        <Form.Checkbox
                            label="3D"
                            name="type"
                            defaultChecked
                            className="viewerType"
                            value={this.state.type}
                            onChange={this.handleChange}
                            options={this.types}
                        />
                        </div>
                        <Header>Описание</Header>

                        <Form.Input 
                            type="text"
                            name="description" 
                            value={this.state.description}
                            onChange={this.handleChange}
                            id="description"
                            error={this.handleErrors("description") ? true : false}
                            rows='5' 
                            cols='50' 
                            placeholder="Описание"/>

                        {this.state.type === "3d" ?
                            <div id={"ggb-add-3d-element"}></div> :
                            <div id={"ggb-add-2d-element"}></div>
                        }
                        

                       

                        {this.handleErrors("description")}
                        {this.props.state.fetching ? 
                        <Message info className="processing">
                            <p style={{marginLeft: '20px'}}>Моля изчакайте...</p>
                        </Message> : null }       
                        {this.props.state.modelFetched ? 
                        <Message color="green">
                            Добавянето успешно
                        </Message> : null }                   

                    </Segment>
                    <Button className="submitButton" type='submit 'color='blue' fluid size='large'>Добави</Button>
                </Form>
            </Segment>
        )
    }
}
