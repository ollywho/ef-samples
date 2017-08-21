import PropTypes from 'prop-types';
import LinkToText from './../Shared/LinkToText';
import * as Colors from '../../Constants/Colors.js';
import * as Clipboard from 'clipboard-js';
import { addCursorText } from './../Shared/CursorText';

class DonutBatchInfoCard extends React.Component {
    constructor(props) {
        super(props);
    }

    getFlavorIndicator(flavorCode) {
        if (flavorCode && flavorCode !== "PL") {
            var flavorColor = flavorCode === "SA" ? Colors.SALTY_COLOR : Colors.SWEET_COLOR;
            return (
                <div className={flavorCode === "SA" ? "flavorSalty" : "flavorSweet"}>
                    <svg height="30" width="30">
                        <circle cx="15" cy="15" r="12.5" stroke={flavorColor} strokeWidth="1" fill="none" />
                        <text x="50%" y="50%" textAnchor="middle" fill={flavorColor} stroke="none" 
                            fontSize="11px" fontWeight="bold" dy="4px">{flavorCode}</text>
                    </svg>
                </div>
            );
        }
        return null;
    }

    getDonutTypeEditor(donutTypeEditable) {
        if (donutTypeEditable) {
            return (
                <LinkToText value={this.props.donutBatchInfo.DonutType} onValueEdited={this.props.onDonutTypeEdited} />
            );
        }
        return (
            <div className="donutType">
                {this.props.donutBatchInfo.ViewOptions.DisplayDonutType ? this.props.donutBatchInfo.DonutType : null}
            </div>
        );
    }

    render() {
        return (
            <div className="donutBatchInfoCard">
                <div className="shelfLifeCol">  
                    <div className="shelfLife">
                        {this.props.donutBatchInfo.ViewOptions.DisplayShelfLife ? this.props.donutBatchInfo.ShelfLife : null}
                    </div>
                    {this.getDonutTypeEditor(this.props.donutBatchInfo.ViewOptions.DonutTypeEditable)}
                </div>
                <div className="donutNameCol">
                    <div className="donutName" onClick={(e) => {
                        Clipboard.copy(this.props.donutBatchInfo.DonutName);
                        addCursorText("Copied", "copyCursor", 15, 0, 2000, 200, e, document);
                    }}>
                        {this.props.donutBatchInfo.DonutName}
                    </div>
                    <div className="donutId" onClick={(e) => {
                        Clipboard.copy(this.props.donutBatchInfo.DonutId);
                        addCursorText("Copied", "copyCursor", 15, 0, 2000, 200, e, document);
                    }}>
                        {this.props.donutBatchInfo.DonutId}
                    </div>
                </div>
                {this.getFlavorIndicator(this.props.donutBatchInfo.FlavorCode)}
            </div>
        );
    }
}

DonutBatchInfoCard.propTypes = {
    donutBatchInfo: PropTypes.shape({
        ShelfLife: PropTypes.number.isRequired,
        DonutType: PropTypes.string.isRequired,
        DonutName: PropTypes.string.isRequired,
        DonutId: PropTypes.string.isRequired,
        FlavorCode: PropTypes.string,
        ViewOptions: PropTypes.shape({
            DisplayShelfLife: PropTypes.bool.isRequired,
            DisplayDonutType: PropTypes.bool.isRequired,
            DonutTypeEditable: PropTypes.bool.isRequired
        })
    })
}

export default ReactRedux.connect(
    function(state) {
        return state.findDonuts.assemblerDonuts;
    },
    function (dispatch) {
        return {
            onDonutTypeEdited: function(donutType) {
                dispatch({
                    type: 'ACTION_PRE_BATCH_DONUTTYPE_EDITED',
                    data: {
                        preBatchDonutType: donutType
                    }
                });
            }
        }
    }
)(DonutBatchInfoCard);