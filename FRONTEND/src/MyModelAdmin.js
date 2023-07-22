import React, { Component } from 'react';
import { variables } from './Variables.js';
import { tsConstructorType } from '@babel/types';
import { useHistory } from 'react-router-dom';
import LogoutButton from './login.js';

export class MyModelAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mymodel: [],
            modalTitle: "",
            Name: "",
            Size: "",
            Link: "",
            Manufacturer: "",
            MyModelId: 0,
            MyModelIdFilter: "",
            NameFilter: "",
            SizeFilter: "",
            ManufacturerFilter: "",
            mymodelWithoutFilter: [],
            manufacturers: [],
            sizes: [],
        }
    }

    FilterFn() {
        var MyModelIdFilter = this.state.MyModelIdFilter ?? '';
        var NameFilter = this.state.NameFilter ?? '';
        var SizeFilter = this.state.SizeFilter ?? '';
        var ManufacturerFilter = this.state.ManufacturerFilter ?? '';

        var filteredData = this.state.mymodelWithoutFilter.filter(function (el) {
            var isMyModelIdMatch = MyModelIdFilter === '' || el.MyModelId.toString().toLowerCase().trim().includes(MyModelIdFilter.toString().toLowerCase().trim());
            var isNameMatch = NameFilter === '' || el.Name.toString().toLowerCase().trim().includes(NameFilter.toString().toLowerCase().trim());
            var isSizeMatch = SizeFilter === '' || el.Size.toString().toLowerCase().trim().includes(SizeFilter.toString().toLowerCase().trim());
            var isManufacturerMatch = ManufacturerFilter === '' || el.Manufacturer.toString().toLowerCase().trim().includes(ManufacturerFilter.toString().toLowerCase().trim());

            return isMyModelIdMatch && isNameMatch && isSizeMatch && isManufacturerMatch;
        });

        this.setState({ mymodel: filteredData });
    }

    sortResult(prop, asc) {
        var sortedData = this.state.mymodelWithoutFilter.sort(function (a, b) {
            if (asc) {
                return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0)
            }
            else {
                return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0)
            }
        });

        this.setState({ mymodel: sortedData });
    }

    changeMyModelIdFilter = (e) => {
        this.state.MyModelIdFilter = e.target.value;
        this.FilterFn();
    }

    changeNameFilter = (e) => {
        this.state.NameFilter = e.target.value;
        this.FilterFn();
    }

    changeSizeFilter = (e) => {
        this.state.SizeFilter = e.target.value;
        this.FilterFn();
    }

    changeManufacturerFilter = (e) => {
        this.state.ManufacturerFilter = e.target.value;
        this.FilterFn();
    }

    changeMyModelLink = (e) => {
        this.setState({ Link: e.target.value });
    };

    refreshList() {
        fetch(variables.API_URL + 'mymodel/')
            .then(response => response.json())
            .then(data => {
                this.setState({ mymodel: data, mymodelWithoutFilter: data });
            });
    }

    handleBeforeUnload = (event) => {
        event.preventDefault();
        localStorage.removeItem('loggedIn');
    };

    componentDidMount() {
        window.addEventListener('beforeunload', this.handleBeforeUnload);
        this.fetchManufacturers();
        this.fetchSizes();
        this.refreshList();
    }

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.handleBeforeUnload);
    }

    fetchManufacturers() {
        fetch(variables.API_URL + "manufacturers/")
            .then(response => response.json())
            .then(data => {
                this.setState({ manufacturers: data }); // Update the state with fetched manufacturers
            })
            .catch(error => {
                console.error('Error fetching manufacturers:', error);
            });
    }

    fetchSizes() {
        fetch(variables.API_URL + "sizes/")
            .then(response => response.json())
            .then(data => {
                this.setState({ sizes: data }); // Update the state with fetched manufacturers
            })
            .catch(error => {
                console.error('Error fetching sizes:', error);
            });
    }

    changeMyModelName = (e) => {
        this.setState({ Name: e.target.value });
    }

    changeMyModelId = (e) => {
        this.setState({ MyModelId: e.target.value });
    }

    changeMyModelManufacturer = (e) => {
        this.setState({ Manufacturer: e.target.value });
    }

    changeMyModelSize = (e) => {
        this.setState({ Size: e.target.value });
    }

    addClick() {
        this.setState({
            modalTitle: "Add MyModel",
            MyModelId: "",
            Manufacturer: "",
            Size: "",
            Name: "",
            Link: ""
        });
    }

    editClick(dep) {
        this.setState({
            modalTitle: "Edit MyModel",
            MyModelId: dep.MyModelId,
            Manufacturer: dep.Manufacturer,
            Name: dep.Name,
            Size: dep.Size,
            Link: dep.Link
        });
    }

    createClick() {
        fetch(variables.API_URL + "mymodel/", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Manufacturer: this.state.Manufacturer,
                Name: this.state.Name,
                Size: this.state.Size,
                Link: this.state.Link
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error('Failed to add: ' + res.status + ' ' + res.statusText);
                }
            })
            .then(result => {
                alert(result);
                this.refreshList();
            })
            .catch(error => {
                alert(error.message);
            });
    }

    updateClick() {
        fetch(variables.API_URL + "mymodel/", {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                MyModelId: this.state.MyModelId,
                Manufacturer: this.state.Manufacturer,
                Name: this.state.Name,
                Size: this.state.Size,
                Link: this.state.Link
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
                this.refreshList();
            }, (error) => {
                alert('Failed');
            })
    }

    deleteClick(id) {
        if (window.confirm('Are you sure?')) {
            fetch(variables.API_URL + "mymodel/" + id + "/", {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then((result) => {
                    alert(result);
                    this.refreshList();
                }, (error) => {
                    alert('Failed');
                })
        }
    }

    render() {
        const {
            mymodel,
            modalTitle,
            Name,
            Size,
            Link,
            Manufacturer,
            MyModelId
        } = this.state;
        return (
            <div>
                <LogoutButton />
                <button type="button"
                    className="btn btn-primary m-2 float-end"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.addClick()}>
                    Add MyModel
                </button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>
                                <div className="d-flex flex-row">
                                    <input className="form-control m-2"
                                        onChange={this.changeMyModelIdFilter}
                                        placeholder="Filter" />
                                    <button type="button" className="btn btn-light"
                                        onClick={() => this.sortResult("MyModelId", true)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z" />
                                        </svg>
                                    </button>
                                    <button type="button" className="btn btn-light"
                                        onClick={() => this.sortResult("MyModelId", false)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
                                        </svg>
                                    </button>
                                </div>
                                MyModelId
                            </th>
                            <th>
                                <div className="d-flex flex-row">
                                    <input className="form-control m-2"
                                        onChange={this.changeManufacturerFilter}
                                        placeholder="Filter" />
                                    <button type="button" className="btn btn-light"
                                        onClick={() => this.sortResult("Manufacturer", true)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z" />
                                        </svg>
                                    </button>
                                    <button type="button" className="btn btn-light"
                                        onClick={() => this.sortResult("Manufacturer", false)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
                                        </svg>
                                    </button>
                                </div>
                                Manufacturer
                            </th>
                            <th>
                                <div className="d-flex flex-row">
                                    <input className="form-control m-2"
                                        onChange={this.changeNameFilter}
                                        placeholder="Filter" />
                                    <button type="button" className="btn btn-light"
                                        onClick={() => this.sortResult("Name", true)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z" />
                                        </svg>
                                    </button>
                                    <button type="button" className="btn btn-light"
                                        onClick={() => this.sortResult("Name", false)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
                                        </svg>
                                    </button>
                                </div>
                                Name
                            </th>
                            <th>
                                <div className="d-flex flex-row">
                                    <input className="form-control m-2"
                                        onChange={this.changeSizeFilter}
                                        placeholder="Filter" />
                                    <button type="button" className="btn btn-light"
                                        onClick={() => this.sortResult("Size", true)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z" />
                                        </svg>
                                    </button>
                                    <button type="button" className="btn btn-light"
                                        onClick={() => this.sortResult("Size", false)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
                                        </svg>
                                    </button>
                                </div>
                                Size
                            </th>
                            <th>
                                Prices
                            </th>
                            <th>
                                Options
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {mymodel.map(dep =>
                            <tr key={dep.MyModelId}>
                                <td >{dep.MyModelId}</td>
                                <td>{dep.Manufacturer}</td>
                                <td>{dep.Name}</td>
                                <td>{dep.Size}</td>
                                <td>
                                    {dep.Link ? (
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => window.open(dep.Link, '_blank')}
                                        >
                                            View on Amazon
                                        </button>
                                    ) : (
                                        <span>No longer sold</span>
                                    )}
                                </td>
                                <td>
                                    <button type="button"
                                        className="btn btn-light mr-1"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        onClick={() => this.editClick(dep)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                    </button>
                                    <button type="button"
                                        className="btn btn-light mr-1"
                                        onClick={() => this.deleteClick(dep.MyModelId)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>)}
                    </tbody>
                </table>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{modalTitle}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="close">
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Manufacturer</span>
                                    <input type="text" className="form-control"
                                        value={Manufacturer}
                                        onChange={this.changeMyModelManufacturer} />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Name</span>
                                    <input type="text" className="form-control"
                                        value={Name}
                                        onChange={this.changeMyModelName} />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Size</span>
                                    <input type="text" className="form-control"
                                        value={Size}
                                        onChange={this.changeMyModelSize} />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Link</span>
                                    <input type="text" className="form-control"
                                        value={Link === null ? '' : Link}
                                        onChange={this.changeMyModelLink} />
                                </div>
                                {MyModelId == 0 ?
                                    <button type="button"
                                        className="btn btn-primary float-start"
                                        onClick={() => this.createClick()}>
                                        Create
                                    </button> : null}
                                {MyModelId != 0 ?
                                    <button type="button"
                                        className="btn btn-primary float-start"
                                        onClick={() => this.updateClick()}>
                                        Update
                                    </button> : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}