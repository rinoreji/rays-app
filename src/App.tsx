import React, { Component } from 'react';
import './App.css';
import CategoryStore from './store/CategoryStore';
import RecordStore from './store/RecordStore';
import { observer } from 'mobx-react';
import { Card } from './components/Card';
import { Record } from './model/Record';
import { CardDetail } from './components/CardDetail';

interface IAppState {
  filterText?: string;
  record?: Record;
}
declare var $: any;

@observer
class App extends Component<any, IAppState> {

  private _record: Record;
  private _recordToEdit:Record;

  constructor(props: any) {
    super(props);

    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);

    this.handleAddSubmit = this.handleAddSubmit.bind(this);

    this.resetRecord();
  }



  render() {
    return (
      <div>
        <nav className="navbar navbar-light bg-light navbar-expand-md">
          <span className="navbar-brand mb-0 h1">Ray's App</span>
          <input className="form-control ml-auto w-50" type="search" placeholder="Search" aria-label="Search" onChange={this.handleFilterChange}></input>
          <button className="navbar-toggler ml-2" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarToggleExternalContent">
            <select id="selCategory" className="form-control ml-2" onChange={this.handleCategoryChange}>
              <option>Select</option>
              {CategoryStore.Categories.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
            </select>
            <button type="button" className="form-control btn btn-outline-primary btn-block ml-2" data-toggle="modal" data-target="#addModal">Add</button>
          </div>
        </nav>

        <main role="main" className="container p-2">
          <div className="card-columns">
            {RecordStore.Records.map((r, i) => <Card key={r.key} record={r} onEdit={this.handleEdit} ></Card>)}
          </div>

          <div className="modal fade" id="addModal">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">

                <div className="modal-header">
                  <h4 className="modal-title">Add</h4>
                  <button type="button" className="close" data-dismiss="modal">&times;</button>
                </div>

                <form onSubmit={this.handleAddSubmit}>
                  <div className="modal-body">
                    <div className="form-group">
                      <label htmlFor="txtCategory">Category</label>
                      <input type="text" className="form-control" readOnly id="txtCategory" name="Category" defaultValue={RecordStore.Category}></input>
                    </div>
                    <div className="form-group">
                      <label htmlFor="txtField1">Field1</label>
                      <input type="text" className="form-control" id="txtField1" name="Field1" defaultValue={this._record.Field1} onChange={this.handleChange}></input>
                    </div>
                    <div className="form-group">
                      <label htmlFor="txtField2">Field2</label>
                      <input type="text" className="form-control" id="txtField2" name="Field2" defaultValue={this._record.Field2} onChange={this.handleChange}></input>
                    </div>
                    <div className="form-group">
                      <label htmlFor="txtField3">Field3</label>
                      <input type="text" className="form-control" id="txtField3" name="Field3" defaultValue={this._record.Field3} onChange={this.handleChange}></input>
                    </div>
                    <div className="form-group">
                      <label htmlFor="txtField4">Field4</label>
                      <input type="text" className="form-control" id="txtField4" name="Field4" defaultValue={this._record.Field4} onChange={this.handleChange}></input>
                    </div>
                  </div>

                  <div className="modal-footer">
                    <button type="submit" className="btn btn-primary btn-outline-success">Save</button>
                    <button type="button" className="btn btn-outline-danger" data-dismiss="modal">Close</button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="modal fade" id="editModal">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Update</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  //TODO:...
                  {/* <CardDetail record={this._recordToEdit}></CardDetail> */}
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-primary">Update</button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  handleFilterChange(event: any): void {
    if (event && event.target) {
      // this.setState({filterText:event.target.value});
      RecordStore.RecordFilter = event.target.value;
    }
  }


  handleEdit(record: Record){
    console.log(record);
    this._recordToEdit = record;
    $('#editModal').modal('show');
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this._record[name] = value;
  }

  handleCategoryChange(event: any): void {
    if (event && event.target) {
      RecordStore.Category = event.target.value;
    }
  }

  handleAddSubmit(event) {
    this._record.key = "";
    this._record.category = RecordStore.Category;

    RecordStore.NewRecord = this._record;

    RecordStore.SaveOrUpdateRecord();
    $('#addModal').modal('toggle');
    this.resetRecord();
    event.preventDefault();
  }


  resetRecord = () => {
    this._record = new Record();

    this._record.key = "";
    this._record.category = "";

    this._record.Field1 = "";
    this._record.Field2 = "";
    this._record.Field3 = "";
    this._record.Field4 = "";
  }

}

export default App;
