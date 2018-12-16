import React from "react";
import { Record } from '../model/Record'

interface ICardProp {
    record: Record;
}

export class Card extends React.Component<ICardProp> {

    render() {
        return (
            <div className="card">
                <div className="card-header">
                    <span>{this.props.record.Field1}</span>
                </div>
                <div className="card-body">
                    <p className="card-text">{this.props.record.Field2}</p>
                    <p className="card-text">{this.props.record.Field3}</p>
                    <p className="card-text">{this.props.record.Field4}</p>
                    <div>
                        <a className="btn btn-outline-secondary btn-sm float-left" href="#" role="button">Edit</a>
                        <footer className="blockquote-footer text-right">{this.props.record.category}</footer>
                    </div>
                </div>
            </div>
        );
    }
}