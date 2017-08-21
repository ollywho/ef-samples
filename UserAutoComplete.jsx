import Autosuggest from 'react-autosuggest';

class UserAutoComplete extends React.Component {
    constructor() {
        super();

        this.state = {
            value: '',
            suggestions: []
        };

        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
        this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
        this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
    }

    handleKeyUp(event) {
        if (event.keyCode === 13) {
            if (this.isAfterSelect) {
                this.isAfterSelect = null;
            } else {
                this.onBlur();
                this.props.onEnterCallback(event);                
            }
        }
    }

    getSuggestions(value) {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        var suggestions = inputLength === 0 ? [] : this.props.suggestions.filter(suggestion =>
            suggestion.Name.toLowerCase().slice(0, inputLength) === inputValue
        );

        return suggestions.slice(0, 5);
    }

    getSuggestionValue(suggestion) {
        return suggestion.Name;
    }

    renderSuggestion(suggestion) {
        return (
            <div>
                {suggestion.Name}
            </div>
        );
    }

    onChange(event, { newValue }) {
        this.setState({
            value: newValue
        });
    }

    onSuggestionsFetchRequested({ value }) {
        this.setState({
            suggestions: this.getSuggestions(value)
        });
    }

    onSuggestionsClearRequested() {
        this.setState({
            suggestions: []
        });
    }

    onSuggestionSelected(event, { suggestion, suggestionValue, suggestionIndex }) {
        if (event.keyCode && event.keyCode === 13) {
            this.isAfterSelect = true;
        }
        this.props.onSuggestionSelected(this.state.suggestions[suggestionIndex].UserId);
    }

    onBlur(event, eventData) {
        var id = '';
        if (eventData && eventData.highlightedSuggestion) {
            id = eventData.highlightedSuggestion.UserId;
        } else {
            var matches = this.props.suggestions
                .filter(suggestion => suggestion.Name.toLowerCase() === this.state.value.trim().toLowerCase());
            if (matches.length > 0) {
                id = matches[0].UserId;
            } else {
                this.setState({
                    value: ''
                });
                id = null;
            }
        }
        this.props.onSuggestionSelected(id);
    }

    render() {
        const { value, suggestions } = this.state;

        const inputProps = {
            placeholder: this.props.placeholder,
            value,
            onChange: this.onChange.bind(this),
            onBlur: this.onBlur.bind(this),
            onKeyUp: this.handleKeyUp.bind(this),
            onFocus: this.props.onFocus
        };

        const theme = {
            container:                'react-autosuggest__container',
            containerOpen:            'react-autosuggest__container--open',
            input:                    this.props.autosuggestSelected ? 'react-autosuggest__input--selected' : 'react-autosuggest__input',
            inputOpen:                'react-autosuggest__input--open',
            inputFocused:             'react-autosuggest__input--focused',
            suggestionsContainer:     'react-autosuggest__suggestions-container',
            suggestionsContainerOpen: 'react-autosuggest__suggestions-container--open',
            suggestionsList:          'react-autosuggest__suggestions-list',
            suggestion:               'react-autosuggest__suggestion',
            suggestionFirst:          'react-autosuggest__suggestion--first',
            suggestionHighlighted:    'react-autosuggest__suggestion--highlighted',
            sectionContainer:         'react-autosuggest__section-container',
            sectionContainerFirst:    'react-autosuggest__section-container--first',
            sectionTitle:             'react-autosuggest__section-title'
        }

        return (
            <Autosuggest suggestions={this.state.suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={this.getSuggestionValue} 
                renderSuggestion={this.renderSuggestion}
                inputProps={inputProps}
                onSuggestionSelected={this.onSuggestionSelected}
                theme={theme} />
    );
    }
}

export default UserAutoComplete;