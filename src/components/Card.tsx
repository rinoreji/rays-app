import React from "react";
import { Record } from '../model/Record'

interface ICardProp {
    record: Record;
}

export class Card extends React.Component<ICardProp> {

    render() {
        return (
            <div className="card">
                <p className="card-text">{this.props.record.category}</p>
                <p className="card-text">{this.props.record.Field1}</p>
                <p className="card-text">{this.props.record.Field2}</p>
                <p className="card-text">{this.props.record.Field3}</p>
                <p className="card-text">{this.props.record.Field4}</p>
            </div>
        );
    }
}