import React, { Component } from 'react';
import { variables } from './Variables.js';
import axios from 'axios';
import { tsConstructorType } from '@babel/types';

export class MyModelUser extends Component {
    constructor(props) {
        super(props);

        this.changeMyModelIdFilter = this.changeMyModelIdFilter.bind(this);
        this.changeNameFilter = this.changeNameFilter.bind(this);
        this.changeSizeFilter = this.changeSizeFilter.bind(this);
        this.changeManufacturerFilter = this.changeManufacturerFilter.bind(this);

        this.state = {
            mymodel: [],
            modalTitle:"",
            Name:"",
            Size:"",
            Manufacturer:"",
            MyModelId: 0,

            MyModelIdFilter: "",
            NameFilter: "",
            SizeFilter: "",
            ManufacturerFilter:"",
            mymodelWithoutFilter: [],
            manufacturers: [],
            sizes: [],
        }
    }

    FilterFn() {
        const {
          MyModelIdFilter,
          NameFilter,
          SizeFilter,
          ManufacturerFilter,
          mymodelWithoutFilter
        } = this.state;
      
        const filteredData = mymodelWithoutFilter.filter(el => {
          const isMyModelIdMatch = MyModelIdFilter === '' || el.MyModelId.toString().toLowerCase().trim().includes(MyModelIdFilter.toString().toLowerCase().trim());
          const isNameMatch = NameFilter === '' || el.Name.toString().toLowerCase().trim().includes(NameFilter.toString().toLowerCase().trim());
          const isSizeMatch = SizeFilter === '' || el.Size.toString().toLowerCase().trim() === SizeFilter.toString().toLowerCase().trim();
          const isManufacturerMatch = ManufacturerFilter === '' || el.Manufacturer.toString().toLowerCase().trim() === ManufacturerFilter.toString().toLowerCase().trim();
      
          return isMyModelIdMatch && isNameMatch && isSizeMatch && isManufacturerMatch;
        });
      
        this.setState({ mymodel: filteredData });
      }
      
      sortResult(prop, asc) {
        const {
          NameFilter,
          SizeFilter,
          ManufacturerFilter,
          mymodelWithoutFilter
        } = this.state;
      
        const sortedData = mymodelWithoutFilter.sort((a, b) => {
          const aValue = a[prop].toString().toLowerCase().trim();
          const bValue = b[prop].toString().toLowerCase().trim();
      
          // Compare the values based on the sorting order (asc or desc)
          if (asc) {
            return aValue.localeCompare(bValue);
          } else {
            return bValue.localeCompare(aValue);
          }
        });
      
        // Apply all the filter options
        const filteredData = sortedData.filter(el => {
          const isNameMatch = NameFilter === '' || el.Name.toString().toLowerCase().trim().includes(NameFilter.toString().toLowerCase().trim());
          const isSizeMatch = SizeFilter === '' || el.Size.toString().toLowerCase().trim() === SizeFilter.toString().toLowerCase().trim();
          const isManufacturerMatch = ManufacturerFilter === '' || el.Manufacturer.toString().toLowerCase().trim() === ManufacturerFilter.toString().toLowerCase().trim();
      
          return isNameMatch && isSizeMatch && isManufacturerMatch;
        });
      
        this.setState({ mymodel: filteredData });
      }
      

    changeMyModelIdFilter = (e) => {
        this.setState({ MyModelIdFilter: e.target.value }, () => {
          this.FilterFn();
        });
      }
      


    changeNameFilter = (e) => {
        this.setState({ NameFilter: e.target.value }, () => {
          this.FilterFn();
        });
      }

    changeSizeFilter = (e) => {
        this.setState({ SizeFilter: e.target.value }, () => {
          this.FilterFn();
        });
      }
      

      changeManufacturerFilter = (e) => {
        this.setState({ ManufacturerFilter: e.target.value }, () => {
          this.FilterFn();
        });
      }
      

    refreshList(){
        fetch(variables.API_URL+'mymodel/')
        .then(response=>response.json())
        .then(data=>{
            this.setState({mymodel:data, mymodelWithoutFilter:data});
        });
    }

    componentDidMount(){
        this.fetchManufacturers();
        this.fetchSizes();
        this.refreshList();
    }

    fetchManufacturers() {
        fetch(variables.API_URL+ "manufacturers/")
        .then(response => response.json())
        .then(data => {
            this.setState({ manufacturers: data }); // Update the state with fetched manufacturers
        })
        .catch(error => {
        console.error('Error fetching manufacturers:', error);
        });
    }

    fetchSizes() {
        fetch(variables.API_URL+ "sizes/")
        .then(response => response.json())
        .then(data => {
            this.setState({ sizes: data }); // Update the state with fetched manufacturers
        })
        .catch(error => {
        console.error('Error fetching sizes:', error);
        });
    }

    changeMyModelName =(e)=>{
        this.setState({Name:e.target.value});
    }

    addClick() {
        this.setState({
          modalTitle: "Add MyModel",
          MyModelId: 0,
          Name: "",
          MyModelIdFilter: "",
          NameFilter: "",
          SizeFilter: "",
          ManufacturerFilter: "",
        });
      }
      
    clearFilters() {
        this.setState({
          MyModelIdFilter: "",
          NameFilter: "",
          SizeFilter: "",
          ManufacturerFilter: "",
        }, () => {
          this.FilterFn();
        });
      }
      

    editClick(dep){
        this.setState({
            modalTitle: "Edit MyModel",
            MyModelId: dep.MyModelId,
            Name:dep.Name
        });
    }

    createClick(){
        fetch(variables.API_URL+"mymodel/",{
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                Name:this.state.Name
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        }, (error)=>{
            alert('Failed');
        })
    }

    updateClick(){
        fetch(variables.API_URL+"mymodel/",{
            method: 'PUT',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                MyModelId:this.state.MyModelId,
                Name:this.state.Name,
                Size:this.state.Size
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        }, (error)=>{
            alert('Failed');
        })
    }

    deleteClick(id){
        if(window.confirm('Are you sure?')){
        fetch(variables.API_URL+"mymodel/"+id+"/",{
            method: 'DELETE',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        }, (error)=>{
            alert('Failed');
        })
    }
    }


    render() {
        const {
            mymodel,
            modalTitle,
            Name,
            sizes,
            manufacturers,
            MyModelId
        }=this.state;
        return (
            <div>
                {/* <button type = "button"
                className = "btn btn-primary m-2 float-end"
                data-bs-toggle = "modal"
                data-bs-target = "#exampleModal"
                onClick = {()=>this.addClick()}>
                    Add MyModel
                </button> */}
                <table className="table table-striped">
                    <thead>
                        <tr>
                        <th>
                        <div className="d-flex flex-row">
          <select className="form-control m-2" onChange={this.changeManufacturerFilter}>
            <option disabled={false} value="">
              --Choose an option--
            </option>
            {this.state.manufacturers.map(manufacturer => (
              <option key={manufacturer.id} value={manufacturer.id}>
                {manufacturer.Manufacturer}
              </option>
            ))}
          </select>
        </div>
  Manufacturer
</th>
                            {/* <th>
                                <div className = "d-flex flex-row">
                                <input className = "form-control m-2"
                                onChange = {this.changeMyModelIdFilter}
                                placeholder = "Filter"/>
                                <button type = "button" className = "btn btn-light"
                                onClick = {()=> this.sortResult("MyModelId", true)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
                                </svg>
                                </button>

                                <button type = "button" className = "btn btn-light"
                                onClick = {()=> this.sortResult("MyModelId", false)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                                <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
                                </svg>
                                </button>
                                </div>
                                MyModelId
                            </th> */}
                            <th>
                            <div className = "d-flex flex-row">
                            <input className = "form-control m-2"
                                onChange = {this.changeNameFilter}
                                placeholder = "Search"/>
                                <button type = "button" className = "btn btn-light"
                                onClick = {()=> this.sortResult("Name", true)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
                                </svg>
                                </button>

                                <button type = "button" className = "btn btn-light"
                                onClick = {()=> this.sortResult("Name", false)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                                <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
                                </svg>
                                </button>
                                </div>
                                Name
                            </th>
                            <th>
                            <div className="d-flex flex-row">
  <select className="form-control m-2" onChange={this.changeSizeFilter}>
    <option disabled={false} value="">
      --Choose an option--
    </option>
    {this.state.sizes.map(size => (
      <option key={size.id} value={size.id}>
        {size.Size}
      </option>
    ))}
  </select>
</div>
Size

</th>

                            {/* <th>
                                Options
                            </th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {mymodel.map(dep =>
                            <tr key={dep.Name}>
                                {/* <td>{dep.MyModelId}</td> */}
                                <td>{dep.Manufacturer}</td>
                                <td>{dep.Name}</td>
                                <td>{dep.Size}</td>
                                {/* <td>
                                    <button type="button"
                                        className="btn btn-light mr-1"
                                        data-bs-toggle = "modal"
                                        data-bs-target = "#exampleModal"
                                        onClick = {()=>this.editClick(dep)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                    </button>
                                    <button type="button"
                                        className="btn btn-light mr-1"
                                        onClick={()=>this.deleteClick(dep.MyModelId)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                                        </svg>
                                    </button>
                                </td> */}
                            </tr>)}
                    </tbody>
                </table>
                <div className = "modal fade" id = "exampleModal" tabIndex = "-1" aria-hidden = "true">
                    <div className = "modal-dialog modal-lg modal-dialog-centered">
                        <div className = "modal-content">
                            <div className = "modal-header">
                                <h5 className = "modal-title">{modalTitle}</h5>
                                <button type = "button" className = "btn-close" data-bs-dismiss = "modal" aria-label = "close">

                                </button>
                            </div>
                            <div className = "modal-body">
                                <div className = "input-group mb-3">
                                    <span className = "input-group-text">Name</span>
                                    <input type = "text" className = "form-control"
                                    value = {Name}
                                    onChange = {this.changeMyModelName}/>
                                </div>
                                {MyModelId == 0?
                                <button type = "button"
                                className = "btn btn-primary float-start"
                                onClick={()=>this.createClick()}>
                                    Create
                                </button>:null}

                                {MyModelId != 0?
                                <button type = "button"
                                className = "btn btn-primary float-start"
                                onClick={()=>this.updateClick()}>
                                    Update
                                </button>:null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}