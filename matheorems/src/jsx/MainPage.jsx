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
            //window.ggbApplet.setBase64("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")
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