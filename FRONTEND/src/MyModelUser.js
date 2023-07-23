import React, { Component } from 'react';
import { variables } from './Variables.js';

export class MyModelUser extends Component {
  constructor(props) {
    super(props);    // Binding functions to the current component instance
    this.changeMyModelIdFilter = this.changeMyModelIdFilter.bind(this);
    this.changeNameFilter = this.changeNameFilter.bind(this);
    this.changeSizeFilter = this.changeSizeFilter.bind(this);
    this.changeManufacturerFilter = this.changeManufacturerFilter.bind(this);
    this.state = {
      // Initial state
      mymodel: [],
      modalTitle: "",
      Name: "",
      Size: "",
      GPU: "",
      Manufacturer: "",
      MyModelId: 0,
      MyModelIdFilter: "",
      NameFilter: "",
      SizeFilter: "",
      GPUFilter: "",
      ManufacturerFilter: "",
      mymodelWithoutFilter: [],
      manufacturers: [],
      sizes: [],
    };
  }
  // Function to filter the data based on various filters
  FilterFn() {
    const {
      MyModelIdFilter,
      NameFilter,
      SizeFilter,
      ManufacturerFilter,
      mymodelWithoutFilter,
      GPUFilter,
    } = this.state;

    const filteredData = mymodelWithoutFilter.filter(el => {
      const isMyModelIdMatch = MyModelIdFilter === '' || el.MyModelId.toString().toLowerCase().trim().includes(MyModelIdFilter.toString().toLowerCase().trim());
      const isNameMatch = NameFilter === '' || el.Name.toString().toLowerCase().trim().includes(NameFilter.toString().toLowerCase().trim());
      const isSizeMatch = SizeFilter === '' || el.Size.toString().toLowerCase().trim() === SizeFilter.toString().toLowerCase().trim();
      const isManufacturerMatch = ManufacturerFilter === '' || el.Manufacturer.toString().toLowerCase().trim() === ManufacturerFilter.toString().toLowerCase().trim();

      const isGPUMatch = GPUFilter === "" || parseInt(el.GPU) > parseInt(GPUFilter);

      return isMyModelIdMatch && isNameMatch && isSizeMatch && isManufacturerMatch && isGPUMatch;
    });

    this.setState({ mymodel: filteredData });
  }
  // Function to sort the results based on a given property and order
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
  // Event handlers to update filter values and trigger filtering
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

  changeGPUFilter = (e) => {
    this.setState({ GPUFilter: e.target.value }, () => {
      this.FilterFn();
    });
  };

  changeManufacturerFilter = (e) => {
    this.setState({ ManufacturerFilter: e.target.value }, () => {
      this.FilterFn();
    });
  }
  // Function to fetch data from the API and update the component state
  refreshList() {
    fetch(variables.API_URL + 'mymodel/')
      .then(response => response.json())
      .then(data => {
        data.sort((a, b) => a.MyModelId - b.MyModelId);
        this.setState({ mymodel: data, mymodelWithoutFilter: data });
      });
  }

  componentDidMount() {
    this.fetchManufacturers();
    this.fetchSizes();
    this.refreshList();
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

  render() {
    const {
      mymodel,
      modalTitle,
      Name,
      sizes,
      GPU,
      manufacturers,
      MyModelId
    } = this.state;
    return (
      <div>
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
              <th>
                <div className="d-flex flex-row">
                  <input className="form-control m-2"
                    onChange={this.changeNameFilter}
                    placeholder="Search" />
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
              <th>
                <div className="d-flex flex-row">
                  <input
                    className="form-control m-2"
                    onChange={this.changeGPUFilter}
                    value={this.state.GPUFilter} // Bind the input value to the state variable
                    placeholder="GPU Length"
                  />
                  <button type="button" className="btn btn-light" onClick={() => this.sortResult("GPU", true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                      <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z" />
                    </svg>
                  </button>
                  <button type="button" className="btn btn-light" onClick={() => this.sortResult("GPU", false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                      <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
                    </svg>
                  </button>
                </div>
                Supported GPU Length(mm)
              </th>
              <th>
                Prices
              </th>
            </tr>
          </thead>
          <tbody>
            {mymodel.map(dep =>
              <tr key={dep.Name}>
                <td>{dep.Manufacturer}</td>
                <td>{dep.Name}</td>
                <td>{dep.Size}</td>
                <td>{dep.GPU}</td>
                <td>
                  {dep.Link ? (
                    <button
                      className="btn btn-primary"
                      onClick={() => window.open(dep.Link, '_blank')}
                    >
                      Check Price
                    </button>
                  ) : (
                    <span>No longer sold</span>
                  )}
                </td>
              </tr>)}
          </tbody>
        </table>
      </div>
    )
  }
}