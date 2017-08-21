import FindDonutsActions from './FindDonutsActions';
import UserAutoComplete from './UserAutoComplete'

class FindDonuts extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.onSearchSelected = this.onSearchSelected.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.onUserSelected = this.onUserSelected.bind(this);
        this.findDonuts = this.findDonuts.bind(this);
        this.onDateInputFocus = this.onDateInputFocus.bind(this);
        this.onDateInputBlur = this.onDateInputBlur.bind(this);
    }

    handleKeyUp(event) {
        if (event.keyCode === 13) {
            this.findDonuts();
            document.activeElement.blur();
        }
    }

    handleChange(event) {
        this.props.onCriteriaChanged(event);
    }

    onUserSelected(value) {
        this.props.onUserSelected(value);
    }

    onSearchSelected() {
        if (!this.props.behavior.searchSelected) {
            this.props.selectSearch(true);
        }
    }

    findDonuts() {
        if (this.props.behavior.searchSelected) {
            this.props.selectSearch(false);
        }
        this.props.findDonuts();
    }

    onDateInputFocus(event){
        event.currentTarget.type = "date";
        this.onSearchSelected();
    }

    onDateInputBlur(event){
        if (event.currentTarget.value === "") {
            event.currentTarget.type = "text";
        }
    }

    render() {
        var bakeDatePlaceholder = "Bake date";
        var expirationDatePlaceholder = "Expiration date";
        var bakeryLocationPlaceholder = "Location";
        var donutTypePlaceholder = "Donut Type";
        var userPlaceholder = "User name";
        var findDonutsSearchLabelClass = "findDonutsSearchLabelHidden";
        var findDonutsSearchInputClass = "findDonutsSearchInput";
        var findDonutsSearchButtonClass = "findDonutsSearchButton";
        var autosuggestSelected = false;

        if (this.props.behavior.searchSelected) {
            bakeDatePlaceholder = "";
            expirationDatePlaceholder = "";
            bakeryLocationPlaceholder = "";
            donutTypePlaceholder = "";
            userPlaceholder = "";
            findDonutsSearchLabelClass = "findDonutsSearchLabel";
            findDonutsSearchInputClass = "findDonutsSearchInputSelected";
            findDonutsSearchButtonClass = "findDonutsSearchButtonSelected";
            autosuggestSelected = true;
        }
        return (
            <div className="findDonutsContainer">
                <div className="findDonutsSearch">
                    <img className="findDonutsIcon" src=".\Images\MagGlass.png" />
                    <div>
                        <div className={findDonutsSearchLabelClass}>Bake date</div>
                        <input id="bakeDate"
                            onFocus={this.onDateInputFocus}
                            onBlur={this.onDateInputBlur}
                            className={findDonutsSearchInputClass}
                            placeholder={bakeDatePlaceholder}
                            onChange={this.handleChange}
                            onKeyUp={this.handleKeyUp}
                            ref={(input) => { this.inputBakeDate = input; }} />
                    </div>
                    
                    <div>
                        <div className={findDonutsSearchLabelClass}>Expiration date</div>
                        <input id="expirationDate" 
                            placeholder={expirationDatePlaceholder} 
                            onFocus= {this.onDateInputFocus}
                            onBlur= {this.onDateInputBlur} 
                            className={findDonutsSearchInputClass}
                            onChange={this.handleChange} 
                            onKeyUp={this.handleKeyUp} />
                    </div>
                    
                    <div>
                        <div className={findDonutsSearchLabelClass}>Location</div>
                        <input id="bakeryLocations" placeholder={bakeryLocationPlaceholder} type="text" 
                            className={findDonutsSearchInputClass} onChange={this.handleChange} onFocus={this.onSearchSelected} 
                            onKeyUp={this.handleKeyUp} />
                    </div>

                    <div>
                        <div className={findDonutsSearchLabelClass}>Donut type</div>
                        <input id="donutTypes" placeholder={donutTypePlaceholder} type="text" className={findDonutsSearchInputClass} 
                            onChange={this.handleChange} onFocus={this.onSearchSelected} onKeyUp={this.handleKeyUp} />
                    </div>

                    <div>
                        <div className={findDonutsSearchLabelClass}>User name</div>
                        <UserAutoComplete 
                            suggestions={!this.props.data.lookups ? [] : this.props.data.lookups.user}
                            onSuggestionSelected={this.onUserSelected}
                            onFocus={this.onSearchSelected}
                            onEnterCallback={this.handleKeyUp}
                            placeholder={userPlaceholder}
                            autosuggestSelected={autosuggestSelected} />
                    </div>
                        
                    <button className={findDonutsSearchButtonClass} onClick={this.findDonuts}>
                        SEARCH
                    </button>
                </div>
            </div>
        );
    }
}

export default ReactRedux.connect(
    function(state) {     
        return state.shared;
    },
    function (dispatch) {
        return {
            findDonuts: function() {
                dispatch(FindDonutsActions.ConfirmSearch());
            },
            getNextChunk: function() {
                dispatch(FindDonutsActions.GetNextChunk());
            },
            onCriteriaChanged: function(event) {
                dispatch(FindDonutsActions.OnCriteriaChanged(event));
            },
            onUserSelected: function(value) {
                dispatch(FindDonutsActions.OnUserSelected(value));
            },
            selectSearch: function(searchSelected) {
                dispatch(FindDonutsActions.SelectSearch(searchSelected));
            }
        };
    }
)(FindDonuts);