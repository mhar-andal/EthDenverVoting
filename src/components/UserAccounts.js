import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import SelectedContact from './SelectedContact';

const names = [
  "Livia Roder",
  "Arianne Estepp",
  "Eula Stamey",
  "Kimberly Angstadt",
  "Shakia Laws",
  "Krystle Sumlin",
  "Karena Hallman",
  "Deana Ouellette",
  "Camellia Winsor",
  "Arthur Mayse"
]

class UserAccounts extends Component {
  state = {
    address: null,
    name: null
  }
  render() {
    console.log('this.props', this.props);
    return (
      <div>
        <Table onCellClick={(thing) => {
          this.setState({
            address: this.props.accounts[thing],
            name: names[thing],
          })
        }}>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Status</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              this.props.accounts && this.props.accounts.map((account, index) => {
                return (
                  <TableRow onCellClick={() => console.log('FUCK YA')}>
                    <TableRowColumn>{account}</TableRowColumn>
                    <TableRowColumn>{names[index]}</TableRowColumn>
                    <TableRowColumn style={{ color: 'green' }}>Eligible</TableRowColumn>
                  </TableRow>
                )
              })
            }
          </TableBody>
        </Table>

        <SelectedContact
          address={this.state.address}
          name={this.state.name}
        />
      </div>
    );
  }
}

export default UserAccounts;