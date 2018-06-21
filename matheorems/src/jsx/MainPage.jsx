import React, { Component } from 'react'
import { Image, Menu, Icon, Header, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { fetchTheorems } from './actions/actions'

@connect((store) => {
    return {
        state: store.stateManager
    }
})
export default class MainPage extends Component {
  
    constructor(props) {
        super(props)
        props.dispatch(fetchTheorems())
    }

    state = { activeTheorem: [], activeClassItem: "", classClicked: false, classNumber: 99999999, prepared: false, }

    handleTheoremClick = (e, { name, id }) => {

        let theorem = {}

        this.props.state.allTheorems.forEach((el) => {
            if (el.name === name && el.id === id) {
                theorem = el
            }
        })

        window.ggbApplet.setBase64(theorem.ggbFile64);
        this.setState({ activeTheorem: theorem });
        
    }
    
    handleClassClick = (e, { name, id }) => {
        let bool = true
        let classNumber = id
        let activeClassItem = name

        if (id === this.state.classNumber) {
            bool = false
            classNumber = 99999999
            activeClassItem = null
        }

        this.setState({ activeClassItem: activeClassItem, classClicked: bool, classNumber: classNumber })
    }

    componentDidMount(){
        dispatchEvent(new Event('ggb-loaded'))
        console.log("Loaded GGB Viewport...")
        setTimeout((function(){
        }).bind(this), 3000)
    }

    classes = [ 8, 9, 10, 11, 12 ]

    allTheorems = {
        '8': [],
        '9': [],
        '10': [],
        '11': [],
        '12': [],
    }

    prepareData(data) {
        data.forEach((el) => {
            this.allTheorems[el.classNum].push(el)
        })
        this.setState({ prepared: true })
    }

    classItem(id, i) {
        return(
            <Menu.Item
                name={id.toString()}
                id={id}
                key={999999 - i}
                active={this.state.activeClassItem === id.toString()}
                onClick={this.handleClassClick}
            >
                <Header>{id}</Header>
            </Menu.Item>
        )
    }

    theoremItem(data, i){
        return(
            <Menu.Item
                className="theorem"
                name={data.name}
                id={data.id}
                key={i}
                active={this.state.activeTheorem === data.name}
                onClick={this.handleTheoremClick}
            >   
                <Header>{data.name} за {this.state.classNumber} клас</Header>
            </Menu.Item>
        )
    }

    renderCurrentlyShowing() {
        return (
            <Segment className="currentlyComparing" color="blue">
                <Header>{this.state.activeTheorem.name}</Header>
                <div>
                    {this.state.activeTheorem.length === 0 ? "Няма избрана теорема." : ""}
                    {this.state.activeTheorem.definition}
                </div>
            </Segment>
        )
    }

    render(){
        if (this.props.state.allTheorems !== undefined && !this.state.prepared) {
            if (this.props.state.allTheorems.length !== 0) {
                this.prepareData(this.props.state.allTheorems)
            }
        }

        return(
            <div className="main-container">
                <div className="main-item left">
                    <div className="class-container">
                        Клас
                        <Menu icon vertical>
                            {this.classes.map((object, i) => this.classItem(object,i)) }
                        </Menu>
                    </div>
                    { this.state.classClicked && this.allTheorems.length !== 0 ?
                    <div>
                        Теореми
                        <Menu vertical>
                            {this.allTheorems[this.state.classNumber].length === 0 ? <Header className="noTheorems"> Няма качени теореми за този клас още </Header> : "" }
                            {this.allTheorems[this.state.classNumber].map((object, i) => this.theoremItem(object, i)) }
                        </Menu> 
                    </div>
                    : null }
                    {this.renderCurrentlyShowing()}
                    
                </div>
                <div className="main-item right">
                    <div id="ggb-element">
                    </div>
                </div>
            </div>
        )
    }
}