import React from "react";
import { Record } from '../model/Record'
import RecordStore from '../store/RecordStore';

interface ICardProp {
    record: Record;
}

export class CardDetail extends React.Component<ICardProp, Record> {

    private _record:Record;

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
        this._record = new Record();
        this._record.key = this.props.record.key;
        this._record.category = this.props.record.category;
        
        this._record.Field1 = this.props.record.Field1;
        this._record.Field2 = this.props.record.Field2;
        this._record.Field3 = this.props.record.Field3;
        this._record.Field4 = this.props.record.Field4;
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this._record[name] = value;
    }

    handleSubmit(event) {
        RecordStore.NewRecord = this._record;
        RecordStore.SaveOrUpdateRecord();
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h4>{this.props.record.key}</h4>
                    <p>{this.props.record.category}</p>
                    <input name="Field1" defaultValue={this.props.record.Field1} onChange={this.handleChange}></input>
                    <input name="Field2" defaultValue={this.props.record.Field2} onChange={this.handleChange}></input>
                    <input name="Field3" defaultValue={this.props.record.Field3} onChange={this.handleChange}></input>
                    <input name="Field4" defaultValue={this.props.record.Field4} onChange={this.handleChange}></input>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}