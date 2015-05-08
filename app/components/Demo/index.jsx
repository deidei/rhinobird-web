var React                = require("react"),
    SmartTimeDisplay     = require("../SmartTimeDisplay"),
    SmartEditor = require("../SmartEditor").SmartEditor,
    SmartPreview = require("../SmartEditor").SmartPreview,
    Select = require("../Select").Select,
    Selector = require("../Select").Selector,
    MaterialPopup = require("../Select").MaterialPopup;

require("./style.less");

export default React.createClass({
    mixins: [React.addons.LinkedStateMixin],

    componentDidMount() {
        this.props.setTitle("Demo");
    },

    getInitialState() {
        return {
            select1: [],
            select2: [],
            repeatedType: null,
            daysInWeek: []
        }
    },

    render: function() {
        return (
            <div>
                <SmartTimeDisplay start="2017-01-01" end="2017-01-02"/><br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<SmartTimeDisplay start="2015-04-24" relative/>
                <br/>
                <br/>
                <br/>
                <br/>
                <div>{this.state.select1.toString()}</div>
                <Select multiple valueLink={this.linkState("select1")} placeholder="Select a team">
                    <optgroup label="NBA">
                        <label></label>
                        <option value="Lakers" data="Lakers">Lakers</option>
                        <option value="Celtics" data="Celtics">Celtics</option>
                        <option value="Warriors" data="Warriors">Warriors</option>
                        <option value="Pacers" data="Pacers">Pacers</option>
                    </optgroup>
                    <optgroup label="CBA">
                        <option value="Guang Dong">Guang Dong</option>
                        <option value="Shang Hai">Shang Hai</option>
                        <option value="Bei Jing">Bei Jing</option>
                    </optgroup>
                </Select>

                <div>{this.state.select2}</div>
                <Select valueLink={this.linkState("select2")}>
                    <option value="Guang Dong">Guang Dong</option>
                    <option value="Shang Hai">Shang Hai</option>
                </Select>

                <br/>

                {this.state.repeatedType}
                <Selector
                    onSelectChange={() => console.log("Selector is changed.")}
                    valueLink={this.linkState("repeatedType")}
                    selectedStyle={{color: "white", backgroundColor: "#3F51B5"}}>
                    <span className="item" name="Daily">Daily</span>
                    <span className="item" name="Weekly">Weekly</span>
                    <span className="item" name="Monthly">Monthly</span>
                    <span className="item" name="Yearly">Yearly</span>
                </Selector>

                <br/>

                {this.state.daysInWeek.toString()}
                <Selector
                    multiple
                    valueLink={this.linkState("daysInWeek")}
                    selectedStyle={{color: "white", backgroundColor: "#3F51B5"}}>
                    <span className="item" name="Sunday">Sun</span>
                    <span className="item" name="Monday">Mon</span>
                    <span className="item" name="Tuesday">Tue</span>
                    <span className="item" name="Wednesday">Wed</span>
                    <span className="item" name="Thursday">Thu</span>
                    <span className="item" name="Friday">Fri</span>
                    <span className="item" name="Saturday">Sat</span>
                </Selector>

                <br/>

                <SmartEditor />
                <SmartEditor nohr hintText="I have no underline" />
                <SmartEditor floatingLabelText="I have a Label" />
                <br/>
                <SmartPreview />
            </div>
        );
    }
});
