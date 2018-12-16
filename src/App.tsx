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

@observer
class App extends Component<any, IAppState> {

  constructor(props: any) {
    super(props);

    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.add = this.add.bind(this);
  }


  render() {
    return (
      <div>
        <nav className="navbar navbar-light bg-light navbar-expand-md">
          <span className="navbar-brand mb-0 h1">Ray's App</span>
          {/* <form className="form-inline"> */}
            <input className="form-control ml-auto w-50" type="search" placeholder="Search" aria-label="Search"></input>
          {/* </form> */}
          <button className="navbar-toggler ml-2" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarToggleExternalContent">
              <select id="selCategory" className="form-control ml-2" onChange={this.handleCategoryChange}>
                {CategoryStore.Categories.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
              </select>
              <button type="button" className="form-control btn btn-outline-primary btn-block ml-2">Add</button>
            </div>
        </nav>
        {/* 
        <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
          <div className="row">
            <div className="col-auto">
              <a className="navbar-brand" href="#">Ray's App</a>
            </div>
            <div className="col-auto">
              <input className="form-control" type="text" placeholder="Search" aria-label="Search" onChange={this.handleFilterChange}></input>
            </div>
            <div className="col">
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>

            <div className="collapse navbar-collapse" id="navbarsExampleDefault">
              <div className="col-auto">
                <select id="selCategory" className="form-control" onChange={this.handleCategoryChange}>
                  {CategoryStore.Categories.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                </select>
              </div>
              <div className="col-auto">
                <a className="nav-link" href="#">Add</a>
              </div>
            </div>

          </div>
        </nav> */}

        <main role="main" className="container">
          <div className="card-deck">
            {RecordStore.Records.map((r, i) => <Card key={r.key} record={r}></Card>)}
          </div>
        </main>
      </div>
      // <div className="App">
      //   <header className="App-header">
      //     <select onChange={this.handleCategoryChange}>
      //       {CategoryStore.Categories.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
      //     </select>
      //     Filter: <input type="text" onChange={this.handleFilterChange}></input>
      //     <br/>
      //     Field1: <input type="text" onChange={this.handleFieldChange}></input>
      //     <button onClick={this.add}> Add </button>
      //   </header>

      //   <div className="card-deck">
      //     {RecordStore.Records.map((r, i) => <Card key={r.key} record={r}></Card>)}
      //   </div>
      // </div>
    );
  }

  handleFilterChange(event: any): void {
    if (event && event.target) {
      // this.setState({filterText:event.target.value});
      RecordStore.RecordFilter = event.target.value;
    }
  }

  handleFieldChange(event: any): void {
    if (event && event.target) {
      // this.setState({filterText:event.target.value});
      RecordStore.NewRecord = new Record();
      RecordStore.NewRecord.Field1 = event.target.value;
    }
  }

  handleCategoryChange(event: any): void {
    if (event && event.target) {
      RecordStore.Category = event.target.value;
    }
  }

  add(): void {
    RecordStore.SaveOrUpdateRecord();
  }

}

export default App;
